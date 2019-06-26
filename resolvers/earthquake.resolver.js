const config = require('config');
const axios = require('axios');
const geolib = require('geolib');

const API_Summary_30d = config.get('API_Summary_30d');

async function getGeoDetails() {
    try {
        const content = await axios.get(API_Summary_30d);
        return content.data;
    } catch {
        return null;
    }
}

const filterByName = async ({
    name
}) => {
    if (!name) {
        name = '';
    }
    let content = await getGeoDetails();
    if (content === null) {
        return null;
    }
    const matchingFeatures = content.features.filter(function (feature) {
        return (feature.properties.place.toLowerCase().indexOf(name.toLowerCase()) >= 0);
    });
    return matchingFeatures;
}

const filterByRadius = async ({
    input
}) => {
    let content = await getGeoDetails();

    const origin = content.features.find(feature => feature.id === input.originId);
    if (!origin) {
        return null;
    }
    const matchingFeatures = content.features.filter(function (feature) {
        //filtering based on magnitude
        if (typeof input.minMagnitude !== 'number') {
            input.minMagnitude = 0;
        }
        if (typeof input.maxMagnitude !== 'number') {
            input.maxMagnitude = 11;
        }
        if (feature.properties.mag < input.minMagnitude || feature.properties.mag > input.maxMagnitude) {
            return false;
        }
        //filtering based on hasTsunami
        if (typeof input.hasTsunami === 'boolean' && (
                (input.hasTsunami && feature.properties.tsunami == null) ||
                (!input.hasTsunami && feature.properties.tsunami !== null)
            )) {
            return false;
        }
        //filtering based on dates
        startDate = new Date(input.startDatetime);
        endDate = new Date(input.endDatetime);
        earthquakeDate = new Date(parseInt(feature.properties.time));
        if (earthquakeDate > endDate || earthquakeDate < startDate) {
            return false;
        }
        //filtering based on the radius
        return geolib.isPointWithinRadius({
                latitude: feature.geometry.coordinates[1],
                longitude: feature.geometry.coordinates[0]
            }, {
                latitude: origin.geometry.coordinates[1],
                longitude: origin.geometry.coordinates[0]
            },
            input.radius * 1000
        );
    });
    return matchingFeatures;
}

const filterById = async ({
    id
}) => {
    let content = await getGeoDetails();

    return content.features.find(feature => feature.id === id);
}

const geoReslver = {
    filterByName: filterByName,
    filterByRadius: filterByRadius,
    filterById: filterById
};

module.exports = geoReslver;
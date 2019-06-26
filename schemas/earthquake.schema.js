const {
  buildSchema
} = require("graphql");

const typeDefs = `
  scalar Coordinates
  scalar Datetime

  type FeatureCollection {
    type: String!
    metadata: Metadata!
    bbox: [BBox]
    features: [Feature]!
  }

  type Metadata {
    generated: Int
    url: String
    title: String
    api: String
    count: Int
    status: Int
  }

  type BBox {
    minimumlongitude: Float!
    minimumlatitude: Float!
    minimumdepth: Float!
    maximumlongitude: Float!
    maximumlatitude: Float!
    maximumdepth: Float!
  }

  type Feature {
    type: String!
    properties: Properties
    geometry: Geometry
    id: String!
  }

  type Properties {
    mag: Float
    place: String
    time: Int
    updated: Int
    tz: Int
    url: String
    detail: String
    felt: Int
    cdi: Float
    mmi: Float
    alert: String
    status: String
    tsunami: Int
    sig: Int
    net: String
    code: String
    ids: String
    sources: String
    types: String
    nst: Int
    dmin: Float
    rms: Float
    gap: Float
    magType: String
    type: String
  }

  type Geometry {
    type: String!
    coordinates: [Coordinates]!
  }

  type Location {
    id: String!
    name: String!
  }

  input LocationFilterInput {
    originId: String!
    minMagnitude: Float
    maxMagnitude: Float
    hasTsunami: Boolean
    radius: Float!
    startDatetime: Datetime!
    endDatetime: Datetime!
  }

  type Query {
    filterByName(name: String): [Feature!]
    filterByRadius(input: LocationFilterInput): [Feature!]
    filterById(id: String!): Feature
  }
`;

const schema = buildSchema(typeDefs);

module.exports = schema;
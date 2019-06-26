# GraphQL-App
This small project retrieves the summary of earthquake recorded form [USGS](earthquake.usgs.gov). This API implemented using GraphQL in order to respond to the request based on the details required.

## Usage
Install the application

```
npm install
```

Running the application on default port(3000). http://localhost:3000/graphql

```
node server.js
```

Running the application on user defined port

```
export PORT=4000
node server.js
```


## API

### Filter By Name
This will filter down the list of locations based on the optional argument for the name (case insensitive).

#### Use case
This can be used in order to auto complete the input for the user while entering the location name.

#### Examples

No argument passed, the query will return all of the results.

```
query feed {
  filterByName {
    id
    properties {
      place
    }
  }
}
```

Location name has been provided to the query and the result will include all locations that contains the argument.

```
query feed {
  filterByName (name: "ABC"){
    id
    properties {
      place
    }
  }
}
```

### Filter By ID
This will filter down the list of locations based on the required argument for the ID of the location.

#### Use case
This can be used in order to get full details of a feature that user has selected.

#### Examples

No argument passed, the query will return all of the results.

```
query details {
  filterById (id: "ak019839ab4v"){
    id
    properties {
      place
      mag
    }
  }
}
```

### Filter By Radius (Complex)
This will filter down the list of locations based on set of filter condition.

```
originId: REQUIRED, the ID of the origin location
minMagnitude: OPTIONAL, Minimum magnitude to filter on
maxMagnitude: OPTIONAL, Maximum magnitude to filter on
hasTsunami: OPTIONAL, if had Tsunami
radius: REQUIRED, radius to filter on (Km)
startDatetime: REQUIRED, start date to filter on
endDatetime: REQUIRED, end date to filter on
```

#### Use case
This can be used in order to list earthquake locations in specific radius of origin, this also provides more filter options.

#### Examples


```
query {
  filterByRadius (input:{
    originId: "ak019839ab4v"
    minMagnitude: 3
    radius: 10
    startDatetime: 1551463605143
    endDatetime: 1561463605143
  }){
    id
    type
    properties {
      place
      mag
    }
    geometry {
      coordinates
    }
  }
}
```

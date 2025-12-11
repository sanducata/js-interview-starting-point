# Closest coffee shops finder

This app finds the 3 closest coffee shops from the user's position.
Shops are ordered from the closest to the farthest and the distance is a number with 4 decimals. The coffee shops are fetched from an api and the user location is manually added with the following command:

```
yarn start <x coordinate> <y coordinate>
```

## Example input

```
yarn start 47.6 -122.4
```

## Example output

```
Starbucks Seattle2, 0.0645
Starbucks Seattle, 0.0861
Starbucks SF, 10.0793
```

## Commands

```
yarn run start # Run the main script
dev # Start development mode
test # Test the code
```

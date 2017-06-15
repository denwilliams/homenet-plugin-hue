# homenet-plugin-hue
Philips Hue plugin for [Homenet](http://www.denwilliams.net/homenet-core/)

> Requires `homenet-core` version `4.0.0-beta.15` or above.

## Installing

```
npm install -g homenet-hue
```

## Usage

Once installed globally it should be automatically discovered when you run `homenet4`.

## Configuration

In the configuration file create a `hue.hubs` key and register each Hue hub/controller.

> Note: at present

```json
{
  "hue": {
    "hubs": [
      { "id": "main", "name": "Main", "host": "192.168.0.123", "key": "valid_hue_api_key" }
    ]
  }
}
```

## Classes

Only the light class for Homenet is implemented.

To add an instance use the type `hue`.

For options specify the Hue `groupId` or `lightId` (should be an integer), and the ID of the hub registered above.

```json
{
  "instances": [
    { "class": "light", "id": "lounge-room", "type": "hue", "options": { "groupId": 3, "hub": "main" } }
  ]
}
```

## Example Config

```json
{
  "instances": [
    { "class": "light", "id": "lounge-room", "type": "hue", "options": { "groupId": 3, "hub": "main" } }
  ],
  "hue": {
    "hubs": [
      { "id": "main", "name": "Main", "host": "192.168.0.123", "key": "valid_hue_api_key" }
    ]
  }
}
```

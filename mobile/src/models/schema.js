export const schema = {
    "models": {
        "Sensor": {
            "name": "Sensor",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "value": {
                    "name": "value",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "latitude": {
                    "name": "latitude",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "longitude": {
                    "name": "longitude",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "timestamp": {
                    "name": "timestamp",
                    "isArray": false,
                    "type": "AWSTimestamp",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Sensors",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "subscriptions": null
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "provider": "iam"
                            },
                            {
                                "allow": "private",
                                "provider": "userPools"
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "version": "8e182143d9bc29a12613523aed5dba71"
};
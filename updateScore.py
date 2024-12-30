import boto3

def updateScore(event, context):
    
    dynamodb_client = boto3.client('dynamodb', region_name='us-east-1')
    dynamodb_resource = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb_resource.Table('Highscore')
    
    updated_value = table.update_item(Key=
        {
        'ID': 0
        },
        ExpressionAttributeNames={
            '#hs': 'Highscore'
        },
        UpdateExpression= 'set hs = score',

        ExpresionAttributeValues={
            ':score': 5
        },
        ReturnValues= 'UPDATED_NEW'
        )

    responsebody = updated_value ['Attributes']['Highscore']

    return {
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Headers': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT,OPTIONS,POST,GET'
            },
            'body': responsebody
        }
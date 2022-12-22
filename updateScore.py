import boto3
import json


def updateScore(event, context):
    dynamodb_client = boto3.client('dynamodb', region_name='us-east-1')
    dynamodb_resource = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb_resource.Table('Highscore')
    jsonObject = json.loads(event['body'])
    score = jsonObject["Highscore"]
    
    response = table.update_item(
     Key={'ID': 0},
     ExpressionAttributeNames = {"#hs": "Highscore"},
     UpdateExpression="SET #hs = :val1",
     ExpressionAttributeValues={":val1": score}
     )

    return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT'
            },
            'body': score
        }
import boto3

def get_score (event, context):

    dynamodb_client = boto3.client('dynamodb', region_name='us-east-1')
    dynamodb_resource = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb_resource.Table('Highscore')
    table_name = "Highscore"
    existing_tables = dynamodb_client.list_tables()['TableNames']
    if table_name not in existing_tables:
        dynamodb_client.create_table(
            TableName= 'Highscore',
            KeySchema= [
                {
                    'AttributeName': 'ID',
                    'KeyType': 'HASH',
                },
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'ID',
                    'AttributeType': 'N'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )

    response = table.get_item(Key={"ID": 0})

    responseBody = response['Item']['Highscore']

    return {
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Headers': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,PUT,GET'
            },
            'body': responseBody
        }
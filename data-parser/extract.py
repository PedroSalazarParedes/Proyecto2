import requests
import json
from neo4j import GraphDatabase

file = 'out.json'
file1 = 'out2.json'


def extract():
    url = 'https://api.spoonacular.com/recipes/random'
    API = ''

    r = requests.get(
        url,
        params={
            'apiKey': API,
            # 'instructionsRequired': True,
            'number': 100
        },
        headers={'content-type': 'application/json'})

    return r.json()


def read():
    with open(file1) as f:
        d = json.load(f)
        # print([r['title'] for r in d['recipes']])
        print(len(d['recipes']))


def match():
    with open('data.json') as f:
        d = json.load(f)
        data = set()

        for r in d:
            data.add(r['title'])

        print(len(data))


def maw():
    data = []
    for i in range(10):
        print(i, len(data))
        # with open('out{}.json'.format(i), 'w', encoding='utf-8') as f:
        data = [*data, *extract()['recipes']]
    with open('data.json', 'w') as f:
        json.dump(data, f, indent=2)


def load(file):
    driver = GraphDatabase.driver('bolt://localhost:7687', auth=('neo4j', 'mypass'))
    # driver = GraphDatabase.driver('bolt://hobby-ofgfbcogogopgbkeeldjondl.dbs.graphenedb.com:24787', auth=('app145874852-6AHnXE', 'b.ht1Xh7M1OWjL.X6EjWbzAOGkdgjvY'))

    ingredients = {}

    def load_ingredients(r):
        ings = r['extendedIngredients']
        for i in ings:
            ingredients[i['id']] = {
                'data': {
                    'aisle': '"{}"'.format(i['aisle']),
                    'image': '"{}"'.format(i['image']),
                    'consitency': '"{}"'.format(i['consitency']),
                    'name': '"{}"'.format(i['name'])
                },
                'measure': {
                    'amount': i['amount'],
                    'unit': '"{}"'.format(i['unit']),
                    'meta': i['meta'],

                    'us_amount': i['measures']['us']['amount'],
                    'us_unitShort': '"{}"'.format( i['measures']['us']['unitShort']),
                    'us_unitLong': '"{}"'.format(i['measures']['us']['unitLong']),

                    'metric_amount': i['measures']['metric']['amount'],
                    'metric_unitShort': '"{}"'.format(i['measures']['metric']['unitShort']),
                    'metric_unitLong': '"{}"'.format(i['measures']['metric']['unitLong'])
                }
            }

    def get_ing(ingredient):
        if ingredient['id'] in ingredients:
            return ingredients[ingredient['id']]
        else:
            return {
                'data': {
                    'aisle': '""',
                    'image': '"{}"'.format( ingredient['image']),
                    'consitency': '""',
                    'name': '"{}"'.format(ingredient['name'])
                },
                'measure': {
                    'amount': '""',
                    'unit': '""',
                    'meta': '""',
                    'us_amount': 0,
                    'us_unitShort': '""',
                    'us_unitLong': '""',
                    'metric_amount': 0,
                    'metric_unitShort': '""',
                    'metric_unitLong': '""'
                }
            }

    def create_recipe(r, i):
        query = ""
        try:
            load_ingredients(r)

            with driver.session() as session:
                query = """
                    CREATE (r:Recipe {{
                        title: "{title}",
                        healthScore: {healthScore},
                        servings: {servings},
                        pricePerServing: {pricePerServing},
                        sourceName: "{sourceName}",
                        source: "{sourceUrl}",
                        spoonacularId: {id},
                        image: "{image}"
                    }})
                """.format(**r)

                for step in r['analyzedInstructions'][0]['steps']:
                    query += """
                        CREATE (s{number}:Step {{ text: "{step}" }})
                        CREATE (r) -[:StepLink{{ step: {number} }}]-> (s{number})
                    """.format(**step)
                    for ingredient in step['ingredients']:
                        query += """
                            MERGE (i{number}_{id}:Ingredient {{ aisle: {aisle}, image: {image}, name: {name}, consitency: {consitency} }})
                            CREATE (s{number}) -[:StepIngredient {{ 
                                                    amount: {amount},
                                                    unit: {unit},
                                                    meta: {meta},
                                                    measures_us_amount: {us_amount},
                                                    measures_us_unitShort: {us_unitShort},
                                                    measures_us_unitLong: {us_unitLong},
                                                    measures_metric_amount: {metric_amount},
                                                    measures_metric_unitShort: {metric_unitShort},
                                                    measures_metric_unitLong: {metric_unitLong}
                                                }}
                                                ]-> (i{number}_{id})
                            
                        """.format(
                            number=step['number'],
                            id=ingredient['id'],
                            **get_ing(ingredient)['data'],
                            **get_ing(ingredient)['measure']
                            # **ingredients[ingredient['id']]['data'],
                            # **ingredients[ingredient['id']]['measure']
                        )
                    for equipment in step['equipment']:
                        query += """
                            MERGE (e{number}_{id}:Equipment {{name:"{name}", image:"{image}" }})
                            CREATE (s{number}) -[:StepEquipment]-> (e{number}_{id})
                        """.format(number=step['number'], **equipment)

                session.run(query, **r)
        except Exception as e:
            with open("./error/recipe_{}.log".format(i), 'w') as fe:
                print('Error on Recipe {}'.format(i))
                fe.write(query)
                fe.write('\n')
                fe.write(str(e))
                

    with open(file) as f:
        data = json.load(f)

        i = 0
        for r in data:
            print(i)
            create_recipe(r, i)
            # if i > 100:
            #     return
            i += 1

            # return


# extract()
# read()
# match()
# maw()
load('data.json')

import json

def items():
    with open('./database/items.json', encoding='utf-8-sig') as json_file:
        items = json.load(json_file)

    with open('./database/item_names.json', encoding='utf-8') as json_file:
        item_names = json.load(json_file)

    for key, value in items.items():
        if key in item_names.keys():
            value['name'] = item_names[key]
        
        if "U" in items[key].keys():
            items[key]["npcs"] = [int(unit_key) for unit_key in items[key]["U"].keys()]
            del items[key]["U"]

        if "O" in items[key].keys():
            items[key]["objects"] = [int(unit_key) for unit_key in items[key]["O"].keys()]
            del items[key]["O"]

        if "V" in items[key].keys():
            items[key]["vendors"] = [int(unit_key) for unit_key in items[key]["V"].keys()]
            del items[key]["V"]

        if "R" in items[key].keys():
            del items[key]["R"]
        

    with open('./src/resources/items.json', 'w') as json_file:  
        json.dump(items, json_file, indent=4)


def objects():
    with open('./database/objects.json', encoding='utf-8') as json_file:
        objects = json.load(json_file)

    with open('./database/object_names.json', encoding='utf-8') as json_file:
        object_names = json.load(json_file)

    new_objects = dict()
    for key, value in objects.copy().items():
        if "coords" in value.keys() and key in object_names.keys():
            new_objects[key] = dict([
                ("name", object_names[key]),
                ("locations", [dict([("coords", dict([("x", coord[0]), ("y", coord[1])])), ("zone", coord[2])]) for coord in value['coords']])
            ])

    with open('./src/resources/objects.json', 'w') as json_file:  
        json.dump(new_objects, json_file, indent=4)


def quests():
    with open('./database/quests.json') as json_file:
        quests = json.load(json_file)

    with open('./database/quest_names.json') as json_file:
        quest_names = json.load(json_file)

    new_quests = dict()

    for key, value in quests.items():
        if key in quest_names.keys():
            new_quests[key] = dict([("name", quest_names[key]["T"])])

            if "start" in value.keys():
                if "U" in value["start"].keys():
                    new_quests[key]["start"] = dict([("id", value["start"]["U"][0]), ("type", "npc")])

                elif "O" in value["start"].keys():
                    new_quests[key]["start"] = dict([("id", value["start"]["O"][0]), ("type", "object")])

            elif "start" not in value.keys() and "I" in value["obj"].keys():
                new_quests[key]["start"] = dict([("id", value["obj"]["I"][0]), ("type", "item")])

            if "end" in value.keys():
                if "U" in value["end"].keys():
                    new_quests[key]["end"] = dict([("id", value["end"]["U"][0]), ("type", "npc")])
                
                elif "O" in value["end"].keys():
                    new_quests[key]["end"] = dict([("id", value["end"]["O"][0]), ("type", "object")])

            if "start" in value.keys() and "end" in value.keys() and "obj" in value.keys():
                if "I" in value["obj"].keys():
                    new_quests[key]["objective"] = [dict([("id", item), ("type", "item")]) for item in value["obj"]["I"]]

                if "U" in value["obj"].keys():
                    new_quests[key]["objective"] = [dict([("id", item), ("type", "npc")]) for item in value["obj"]["U"]]


            

    with open('./src/resources/quests.json', 'w') as json_file:
        json.dump(new_quests, json_file, indent=4)


def units():
    with open('./database/units.json', encoding='utf-8') as json_file:
        units = json.load(json_file)

    with open('./database/unit_names.json', encoding='utf-8') as json_file:
        unit_names = json.load(json_file)

    new_units = dict()
    for key, value in units.copy().items():
        if "coords" in value.keys() and key in unit_names.keys():
            new_units[key] = dict([
                ("name", unit_names[key]),
                ("locations", [dict([("coords", dict([("x", coord[0]), ("y", coord[1])])), ("zone", coord[2])]) for coord in value['coords']])
            ])


    with open('./src/resources/units.json', 'w') as json_file:  
        json.dump(new_units, json_file, indent=4)


if __name__ == "__main__":
    items()
    objects()
    quests()
    units()
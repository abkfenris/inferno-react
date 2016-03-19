import json
import copy


with open('contour-feet.tmp.geojson', 'r') as f:
    old = json.load(f)

new = copy.deepcopy(old)
new['features'] = []
for feature in old['features']:
    new_feature = copy.deepcopy(old[feature])
    new_feature['properties']['index'] = old[feature]['properties']['index'] / 12.19 * 40.0
    new['features'].append(new_feature)

with open('contour-feet.geojson', 'w') as f:
    json.dump(new, f)

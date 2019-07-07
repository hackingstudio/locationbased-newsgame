```
SELECT ?Landkreis_in_Deutschland ?Lagekarte ?German_district_key ?official_name WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  ?Landkreis_in_Deutschland wdt:P31 wd:Q22865.
  OPTIONAL { ?Landkreis_in_Deutschland wdt:P94 ?Lagekarte. }
  OPTIONAL { ?Landkreis_in_Deutschland wdt:P440 ?German_district_key. }
  OPTIONAL { ?Landkreis_in_Deutschland wdt:P1448 ?official_name. }


}
LIMIT 800
```

```
SELECT ?Landkreis_in_Deutschland ?Lagekarte ?German_district_key ?official_name WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  ?Landkreis_in_Deutschland wdt:P31 wd:Q106658.
  OPTIONAL { ?Landkreis_in_Deutschland wdt:P94 ?Lagekarte. }
  OPTIONAL { ?Landkreis_in_Deutschland wdt:P440 ?German_district_key. }
  OPTIONAL { ?Landkreis_in_Deutschland wdt:P1448 ?official_name. }


}
LIMIT 800
```

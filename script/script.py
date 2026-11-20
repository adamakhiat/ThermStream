import random as rd
import time 
from datetime import datetime
import requests
import threading
test = {
  "sensor_id": "temp_sensor_04",
  "timestamp": "2026-06-06T14:30:00Z",
  "metric": "temperature",
  "value": 72.5,
  "unit": "Celsius"
}
url = "http://localhost:3000/temp"
rd.seed(23)
sensors = {
    "temp_sensor_01": {"temp": 30,"state":rd.choice([0,1,2]),"shift":rd.randint(30,120),"ticks":0},
    "temp_sensor_02": {"temp": 24,"state":rd.choice([0,1,2]),"shift":rd.randint(30,120),"ticks":0},
    "temp_sensor_03": {"temp": 18,"state":rd.choice([0,1,2]),"shift":rd.randint(30,120),"ticks":0},
    "temp_sensor_04": {"temp": 13,"state":rd.choice([0,1,2]),"shift":rd.randint(30,120),"ticks":0},
    "temp_sensor_05": {"temp": 20,"state":rd.choice([0,1,2]),"shift":rd.randint(30,120),"ticks":0}}
Y = {
     "temp_sensor_01":[],
     "temp_sensor_02":[],
     "temp_sensor_03":[],
     "temp_sensor_04":[],
     "temp_sensor_05":[]
     
}
x = 0
def tempGenerator(i):
    while True:
        sensorId= rd.choice(list(sensors.keys()))
        s = sensors[sensorId]
        if s["ticks"] > s["shift"]:
            s["state"] = rd.choice([0,1,2])
            s["ticks"] = 0
            s["shift"] = rd.randint(30,120)
        if s["state"] == 0:
            s["temp"] = s["temp"] + rd.uniform(-1, 1)
        elif s["state"] == 1:
            s["temp"] = s["temp"] + rd.uniform(1, 2)
        else:
            s["temp"] = s["temp"] + rd.uniform(-1, 0)

        s["ticks"] = s["ticks"] + 1
        
        payload = {

    "sensor_id": sensorId,

    "timestamp": datetime.now().isoformat(),

    "metric": "temperature",

    "value": s["temp"],

    "unit": "Celsius"

        }
        
        response = requests.post(url=url,json=payload,timeout=5)
        response.raise_for_status()
        print(response.json())
        
i = 0
for i in range(1000):
    t = threading.Thread(target=tempGenerator,args=(i,))
    t.start()
    ##response = requests.post(url=url,json=payload,timeout=5)
    ##response.raise_for_status()
    ## print(response.json())




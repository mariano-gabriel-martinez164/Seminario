import requests
import json
from random import randint
import asyncio
import aiohttp

token = 'Token -----'
url_past = 'http://localhost:8000/turnos/?fecha_inicio=2024-10-25&fecha_fin=2024-11-25&estado=Disponible'
url_future = 'http://localhost:8000/turnos/?fecha_inicio=2024-11-26&fecha_fin=2024-11-30&estado=Disponible'
pacientes_list = []
turnos_list_past = []
turnos_list_future = []

headers = {
    'Authorization': token
}

def get_random_status(statuses_by_weight, default_status):
    random_number = randint(1, 100) / 100
    current_weight = 0
    for status, weight in statuses_by_weight.items():
        current_weight += weight
        if random_number <= current_weight:
            return status
    return default_status

def get_random_status_past():
    statuses_by_weight = {
        'Cancelado': 0.3,
        'Realizado': 0.7,
    }
    default_status = 'Disponible'
    return get_random_status(statuses_by_weight, default_status)

def get_random_status_future():
    statuses_by_weight = {
        'Asignado': 0.5,
        'Cancelado': 0.3,
    }
    default_status = 'Disponible'
    return get_random_status(statuses_by_weight, default_status)

def get_pacientes():
    url = 'http://localhost:8000/pacientes/?page_size=50'
    if len(pacientes_list) == 0:
        response = requests.get(url, headers=headers)
        pacientes = response.json().get('results')
        for paciente in pacientes:
            pacientes_list.append(paciente)
    return pacientes_list

def get_random_paciente():
    pacientes = get_pacientes()
    return pacientes[randint(0, len(pacientes) - 1)]

def get_turnos_past(url):
    if len(turnos_list_past) == 0:
        response = requests.get(url, headers=headers)
        turnos = response.json()
        for turno in turnos:
            turnos_list_past.append(turno)
    return turnos_list_past

def get_turnos_future(url):
    if len(turnos_list_future) == 0:
        response = requests.get(url, headers=headers)
        turnos = response.json()
        for turno in turnos:
            turnos_list_future.append(turno)
    return turnos_list_future


async def modificar_turno(turno, past=True):
    turno.pop('paciente', None)
    turno.pop('turnoTemplateId', None)

    if past: 
        turno['estado'] = get_random_status_past()
        if turno['estado'] == 'Disponible': return
        turno['dni'] = get_random_paciente()['dni']

    else: 
        turno['estado'] = get_random_status_future()
        if turno['estado'] == 'Disponible': return
        if turno['estado'] != 'Cancelado': 
            turno['dni'] = get_random_paciente()['dni']
        else:
            turno['dni'] = None



    async with aiohttp.ClientSession() as session:
        await session.post('http://localhost:8000/turnos/', headers=headers, json=turno)
        await asyncio.sleep(1.5)


async def eliminar_turno(turno):
    if not turno['id']: return
    async with aiohttp.ClientSession() as session:
        await session.delete(f'http://localhost:8000/turnos/{turno["id"]}/', headers=headers)
        await asyncio.sleep(1.5)

async def main():
    # t = get_turnos_past(url_past)
    # print(f'Cantidad de turnos pasados: {len(t)}')
    tasks = []
    # for i, turno in enumerate(t):
    #     print(f'modificando turno pasado {i + 1} de {len(t)}')
    #     tasks.append(modificar_turno(turno))
    
    t2 = get_turnos_future(url_future)
    print(f'Cantidad de turnos futuros: {len(t2)}')
    for i, turno in enumerate(t2):
        print(f'modificando turno futuro {i + 1} de {len(t2)}')
        tasks.append(modificar_turno(turno, False))

    await asyncio.gather(*tasks)

asyncio.run(main())




# response = requests.get(url, headers=headers)
# print(json.dumps(response.json(), indent=4))



import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Регистрация игрока на турнир CS2. Принимает имя, ник и аккаунт Steam."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    HEADERS = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }

    if event.get('httpMethod') == 'POST':
        body = json.loads(event.get('body') or '{}')
        real_name = (body.get('real_name') or '').strip()
        nickname = (body.get('nickname') or '').strip()
        steam_account = (body.get('steam_account') or '').strip()

        if not real_name or not nickname or not steam_account:
            return {
                'statusCode': 400,
                'headers': HEADERS,
                'body': json.dumps({'error': 'Все поля обязательны'})
            }

        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()

        cur.execute(
            "SELECT id FROM tournament_players WHERE nickname = %s OR steam_account = %s",
            (nickname, steam_account)
        )
        if cur.fetchone():
            cur.close()
            conn.close()
            return {
                'statusCode': 409,
                'headers': HEADERS,
                'body': json.dumps({'error': 'Игрок с таким ником или Steam аккаунтом уже зарегистрирован'})
            }

        cur.execute(
            "INSERT INTO tournament_players (real_name, nickname, steam_account) VALUES (%s, %s, %s) RETURNING id, registered_at",
            (real_name, nickname, steam_account)
        )
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': json.dumps({
                'id': row[0],
                'real_name': real_name,
                'nickname': nickname,
                'steam_account': steam_account,
                'registered_at': row[1].isoformat()
            })
        }

    if event.get('httpMethod') == 'GET':
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        cur.execute("SELECT id, real_name, nickname, steam_account, registered_at FROM tournament_players ORDER BY registered_at DESC")
        rows = cur.fetchall()
        cur.close()
        conn.close()

        players = [
            {
                'id': r[0],
                'real_name': r[1],
                'nickname': r[2],
                'steam_account': r[3],
                'registered_at': r[4].isoformat()
            }
            for r in rows
        ]
        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': json.dumps({'players': players, 'total': len(players)})
        }

    return {'statusCode': 405, 'headers': HEADERS, 'body': json.dumps({'error': 'Method not allowed'})}

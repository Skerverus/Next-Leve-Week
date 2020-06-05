import {Request, Response} from 'express'
import knex from '../database/connection'

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()))//Transforma o objeto selecionado em uma string, separa-o por vírgula e retira os espaços

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')//Retorna valores diferentes para evitar que seja exibido 2x o mesmo local pois no momento da busca de itens, o local pode ter 2 itens e isto faria a exebição do mesmo 2x

        const serializedPoints = points.map(point => {
            return {
                ...point,//Retorna todos os valores dos pontos
                image_url: `http://192.168.0.198:3333/uploads/${point.image}`
            }
        })

        return response.json(serializedPoints)
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const point = await knex('points')
        .where('id', id)
        .first()

        if (!point) {
            return response.status(400).json({message: 'Point not found'})
        }

        const serializedPoint = {
            ...point,//Retorna todos os valores dos pontos
            image_url: `http://192.168.0.198:3333/uploads/${point.image}`
            
        }
        /*
            SELECT* FROM items
            JOIN point_items ON items.id = point_items.tem_id
            WHERE point_items.point_id = id
        */
        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')

        return response.json({ point: serializedPoint, items })
    }

    async create (request: Request, response: Response) {
        const {//Este formato é uma desestruturação, faz tudo de uma vez para não precisar fazer a mesma coisa para todas as variáveis
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body
    
        const trx = await knex.transaction()//Transaction serve para não executar uma query caso outra não tenha sucesso

        const point = {//Short syntaxe, quando a variável tiver o mesmo nome do item recebido, ele pode ser escrito assim
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
    
        const insertedIds = await trx('points').insert(point)
    
        const point_id = insertedIds[0]
    
        const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        })

        
    
        await trx('point_items').insert(pointItems)

        await trx.commit()//Faz os inserts na base de dados
    
        return response.json({
            id:point_id,
            ...point,//Três pontos serve para pegar todos os dados de um objeto e coloca em outro
        })
    }
}

export default PointsController
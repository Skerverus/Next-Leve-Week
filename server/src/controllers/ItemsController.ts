import {Request, Response} from 'express'
import knex from '../database/connection'

class ItemsController {
    async index(request: Request, response: Response) {//ASYNC é usado quando um AWAIT estiver sendo utilizado
        const items = await knex('items').select('*')
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.0.198:3333/uploads/${item.image}`
            }
        })//map() percorre por todos os itens retornado e permite que sejam modificados como quiser
    
        return response.json(serializedItems)
    }
}

export default ItemsController
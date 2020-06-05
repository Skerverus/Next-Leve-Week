import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('items').insert([//AWAIT é utilizado para esperar o término do carregamento do código em que o mesmo é posicionado
        { title: 'Lâmpadas', image: 'lampadas.svg',},
        { title: 'Pilhas e Baterias', image: 'baterias.svg',},
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg',},
        { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg',},
        { title: 'Resíduos Orgânicos', image: 'organicos.svg',},
        { title: 'Óleo de Cozinha', image: 'Oleo.svg',},
    ])
}
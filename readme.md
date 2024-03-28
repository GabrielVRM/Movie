# Project Movie Backend

- A ideia agora é criar uma aplicação em Node.js onde o usuário cadastra um filme, preenche com algumas informações (nome, descrição, nota) e cria tags relacionadas a ele.

![Untitled](https://github.com/GabrielVRM/Movie/assets/95998556/d6dcbcfc-6030-4898-86bd-40ced6ce7dce)

## Hard skills

## Regar de Negocios

- users 1:N movie_notes
- tags 1:N movie_notes

#### Users

- nome required
- password required
- email required

#### Movie_Notes

- title required
- description required
- rating required

#### Tags

- note_id required
- user_id required
- name required

#### tipos de metodos que se pode ter no controller:

- Index = GET, listar todos os dados
- show = GET, listar um dado especifico
- created = POST, criar um dado especifico
- update = PUT, atualizar um dado especifico
- delete = DELETE, remover um dado especifico

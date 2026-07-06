# SIM

O **SIM** é um aplicativo para **controle de estoque**, desenvolvido para facilitar o gerenciamento de produtos, movimentações e demais operações relacionadas ao estoque.

## Estrutura do projeto

```
.
├── mobile/        # Aplicação React Native / Expo
└── README.md
```

Toda a aplicação está localizada na pasta `mobile`.

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de possuir instalado:

- Node.js (versão LTS recomendada)
- npm

## Executando o projeto

Entre na pasta da aplicação:

```bash
cd mobile
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm run web
```

Em outro terminal, inicie o servidor responsável pelos dados locais:

```bash
npm run json-server
```

## Banco de dados

O projeto utiliza o **JSON Server** para simular uma API durante o desenvolvimento.

Todos os dados são armazenados no arquivo:

```
db.json
```

Qualquer alteração realizada pela aplicação será persistida nesse arquivo enquanto o servidor estiver em execução.

## Tecnologias

- React Native
- Expo
- TypeScript
- JSON Server

## Desenvolvimento

Após iniciar tanto a aplicação quanto o JSON Server, o ambiente estará pronto para desenvolvimento local.

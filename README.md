# Sistema de recomendações 

## Sobre o projeto

Este projeto consiste em um sistema de notificações que realiza o envio de notificações aos usuários cadastrados utilizando o serviço SNS (Simple Notification Service) da AWS (Amazon Web Services).
## Tecnologias utilizadas

- Node.js
- EJS
- SNS 

## Funcionamento

O sistema conta com três opções de tela, sendo uma de cadastro de usuário, uma de seleção de categorias e uma de controle de usuários.

### Tela de cadastro

Na tela de cadastro, o usuário pode cadastrar o e-mail em que deseja receber as mensagens.

<p align="center">
  <img src="https://user-images.githubusercontent.com/40704890/204693661-c8d8ffe1-71e0-4e4a-9594-eea39c8f4427.png" alt="Tela de cadastro"/>
</p>

### Tela de categorias

Na tela de seleção de categorias, existem três categorias disponíveis, onde é possível escolher sobre quais categorias serão enviadas notificações ao usuário. O usuário deve escolher pelo menos uma das opções disponíveis.

<p align="center">
  <img src="https://user-images.githubusercontent.com/40704890/204693687-6431d0ad-2a16-48cc-9abd-855bef2c10ed.png" alt="Tela de categorias"/>
</p>

### Tela de controle de usuários

Na tela de controle de usuários, é possível verificar a quantidade de usuários que estão cadastrados e que já confirmaram o e-mail, bem como, é possível verificar também a quantidade de usuários que estão cadastrados, mas que ainda não realizaram a confirmação do e-mail. 

O serviço AWS SNS envia uma mensagem de confirmação para o usuário após a solicitação de cadastro. Dessa forma, o usuário deve confirmar o seu interesse em receber as mensagens antes de começar a receber de fato as mensagens.

<p align="center">
  <img src="https://user-images.githubusercontent.com/40704890/204693734-1642ad2a-f502-4ba0-a0e7-1fb00789701b.png" alt="Tela de controle de usuários"/>
</p>

## Arquitetura

O sistema implementado possui a seguinte arquitetura:

<p align="center">
  <img src="https://user-images.githubusercontent.com/40704890/204693755-a8b7fc96-5f7f-474e-a24a-37051932f01d.png" alt="Arquitetura"/>
</p>
import 'babel-polyfill';
import { NegociacaoController } from './controllers/NegociacaoController.js';
import { Negociacao } from './domain/index.js';
import config from 'config';

import 'bootstrap/js/modal.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const controller = new NegociacaoController();
const negociacao = new Negociacao(new Date(), 1, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');
const body = JSON.stringify(negociacao);
const method = 'POST';

const requestconfig = {
  method,
  headers,
  body
};

fetch(`${config.baseApiUrl}/negociacoes`, requestconfig).then(() =>
  console.log('Dado enviado com sucesso')
);

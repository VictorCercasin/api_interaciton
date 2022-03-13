import axios from "axios";

const api = axios.create({
  baseURL: "https://sistemalift1.com/lift_ps/api/",
});

const getPedidos = async () => {
  let retorno;
  await api
    .get(`/pedidos`, {
      params: {},
    })
    .then((response) => {
      retorno = response.data;
    });
  return retorno;
};

const getPedido = async (pedido) => {
  let retorno;
  await api
    .get(`/pedidos/${pedido}`, {
      params: {
        id: pedido,
      },
    })
    .then((response) => {
      retorno = response.data;
    });
  return retorno;
};

const getClientes = async () => {
  let retorno;
  await api
    .get(`/clientes`, {
      params: {},
    })
    .then((response) => {
      retorno = response.data;
    });
  return retorno;
};

const getCliente = async (cliente) => {
  let retorno;
  await api
    .get(`/clientes/${cliente}`, {
      params: {
        id: cliente,
      },
    })
    .then((response) => {
      retorno = response.data;
    });
  return retorno;
};

const getAllItensPedido = async () => {
  let retorno;
  await api
    .get(`/ItensPedido`, {
      params: {},
    })
    .then((response) => {
      retorno = response.data;
    });
  return retorno;
};

const getItensPedido = async (pedido) => {
  let retorno;
  await api
    .get(`/ItensPedido/${pedido}`, {
      params: {
        id: pedido,
      },
    })
    .then((response) => {
      retorno = response.data;
    });
  return retorno;
};

const getProduto = async (id) => {
  let retorno;
  await api.get(`/Produtos/${id}`, {}).then((response) => {
    retorno = response.data;
  });
  return retorno;
};

const getAllItensProdutos = async () => {
  let retorno;
  await api
    .get(`/Produtos`, {
      params: {},
    })
    .then((response) => {
      retorno = response.data;
    });
  return retorno;
};

export {
  api,
  getPedidos,
  getPedido,
  getClientes,
  getCliente,
  getAllItensPedido,
  getItensPedido,
  getProduto,
  getAllItensProdutos,
};

import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactLoading from "react-loading";

import "./home.css";
import "./../assets/global.css";
import PageContainer from "../pageContainer/PageContainer";
import {
  getPedidos,
  getPedido,
  getCliente,
  getClientes,
  getItensPedido,
  getProduto,
  getAllItensPedido,
  getAllItensProdutos,
} from "../services/api";
import Loading from "react-loading";

const Home = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [itensPedidos, setItensPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showExtraInfo, setShowExtraInfo] = useState(-1);

  useEffect(async () => {
    setPedidos(await getPedidos()); //Get initial data from api
  }, []);

  useEffect(async () => {
    if (pedidos.length > 0) {
      setClientes(await getClientes());
    }
  }, [pedidos]);

  useEffect(async () => {
    if (pedidos.length > 0) {
      setItensPedidos(await getAllItensPedido());
    }
  }, [clientes]);

  useEffect(async () => {
    if (itensPedidos.length > 0) {
      setProdutos(await getAllItensProdutos());
    }
  }, [itensPedidos]);

  useEffect(async () => {
    if (produtos.length > 0) {
      // console.log("pedidos: ", pedidos);
      // console.log("clientes: ", clientes);
      // console.log("itensPedidos: ", itensPedidos);
      // console.log("produtos: ", produtos);

      setLoading(false);
    }
  }, [produtos]);

  const getClienteFromId = (id) => {
    //CERTO
    return clientes.find((cliente) => {
      return cliente.id === id;
    });
  };

  const getPedidoFromId = (id) => {
    //CERTO
    return pedidos.find((pedido) => {
      return pedido.id === id;
    });
  };

  const getValorFromPedidoId = (id) => {
    let valor = 0;
    let preco = 0;
    let itensDoPedido = itensPedidos.filter((item) => {
      //CERTO
      return item.pedido === id;
    });
    itensDoPedido.forEach((item) => {
      valor =
        valor +
        produtos.find((produto) => {
          return produto.id === item.produto;
        }).valor *
          item.quantidade;
    });
    return valor;
  };

  const getItensDoPedidoFromPedidoId = (id) => {
    let itensDoPedido = itensPedidos.filter((item) => {
      return item.pedido === id;
    });
    return itensDoPedido;
  };

  const detailsButtomManager = (id) => {
    if (showExtraInfo === id) {
      setShowExtraInfo(-1);
    } else {
      setShowExtraInfo(id);
    }
  };

  const getProdutoFromId = (id) => {
    return produtos.find((produto) => {
      return produto.id === id;
    });
  };

  return (
    <PageContainer>
      {loading ? (
        <div class="container-2">
          <ReactLoading type="bubbles" color="#2072a1"></ReactLoading>
        </div>
      ) : (
        <>
          <h1>Lista de pedidos</h1>
          <Table id="customers">
            <tbody>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Valor</th>
              </tr>
              {pedidos.map((item, index) => (
                <tr key={index} onMouseDown={() => detailsButtomManager(item.id)}>
                  <td>{item.id}</td>
                  <td>{getClienteFromId(item.cliente).nome}</td>
                  <td>{item.data}</td>
                  <td>{`R$ ${getValorFromPedidoId(item.id).toFixed(2)}`}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {showExtraInfo != -1 && (
            <>
              <div class="container-1">
                <h1>Informações do Pedido</h1>
                <h3 id="text-1">{`Pedido: ${showExtraInfo}`}</h3>
              </div>
              <Table id="customers">
                <tbody>
                  <tr>
                    <th colSpan="4">Dados do cliente</th>
                  </tr>
                  <tr>
                    <td>{`Nome: ${
                      getClienteFromId(getPedidoFromId(showExtraInfo).cliente)
                        .nome
                    }`}</td>
                    <td>{`CPF: ${
                      getClienteFromId(getPedidoFromId(showExtraInfo).cliente)
                        .cpf
                    }`}</td>
                    <td>{`Data: ${getPedidoFromId(showExtraInfo).data}`}</td>
                    <td>{`E-mail: ${
                      getClienteFromId(getPedidoFromId(showExtraInfo).cliente)
                        .email
                    }`}</td>
                  </tr>
                </tbody>
              </Table>
              <h1>Itens do Pedido</h1>
              <Table id="customers">
                <tbody>
                  <tr>
                    <th>Código</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                  </tr>
                  {getItensDoPedidoFromPedidoId(showExtraInfo).map(
                    (produto, index) => (
                      <tr key={index}>
                        <td>{produto.produto}</td>
                        <td>{getProdutoFromId(produto.produto).nome}</td>
                        <td>{produto.quantidade}</td>
                        <td>{`R$ ${(
                          getProdutoFromId(produto.produto).valor *
                          produto.quantidade
                        ).toFixed(2)}`}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
              <h1>{`Total: R$ ${getValorFromPedidoId(showExtraInfo).toFixed(
                2
              )}`}</h1>
            </>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default Home;

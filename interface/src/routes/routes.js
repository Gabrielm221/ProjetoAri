import React from "react";
import DashBoard from "../pages/dashboard";
import HomePage from "../pages/HomePage";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import CreateUsuario from "../components/Usuario/CreateUsuario";
import ListUsuarios from "../components/Usuario/ListUsuarios";
import UpdateUsuario from "../components/Usuario/UpdateUsuario";
import CreateRemedio from "../components/Remedio/CreateRemedio";
import ListRemedios from "../components/Remedio/ListRemedios";
import CreatePrescricao from "../components/Prescricao/CreatePrescricao";
import ListPrescricoes from "../components/Prescricao/ListPrescricoes";
import CreateHistorico from "../components/Historico/CreateHistorico";
import ListHistoricos from "../components/Historico/ListHistoricos";
import Agenda from "../pages/Agenda";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element = {<HomePage/>}></Route>
                <Route path="/dashboard" element = {<DashBoard/>}></Route>
                <Route path="/login" element = {<Login/>}></Route>
                <Route path="/logout" element = {<Logout/>}></Route>
                <Route path="/criarusuario" element = {<CreateUsuario/>}></Route>
                <Route path="/listarusuarios" element = {<ListUsuarios/>}></Route>
                <Route path="/atualizarusuarios" element = {<UpdateUsuario/>}></Route>
                <Route path="/criarremedios" element = {<CreateRemedio/>}></Route>
                <Route path="/listarremedios" element = {<ListRemedios/>}></Route>
                <Route path="/criarprescricao/:id" element={<CreatePrescricao />} />
                <Route path="/listarprescricao" element = {<ListPrescricoes/>}></Route>
                <Route path="/criarhistorico" element = {<CreateHistorico/>}></Route>
                <Route path="/listarhistorico" element = {<ListHistoricos/>}></Route>
                <Route path="/agenda" element = {<Agenda/>}></Route>
            </Routes>
        </Router>
    )

}

export default AppRoutes
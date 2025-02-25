import { createRouter, createWebHistory } from 'vue-router'

//import Main from '../components/main/Main.vue'
import MainV2 from '../components/mainV2/MainV2.vue'
import SmartGarden from '../components/smartGarden/SmartGarden.vue'

import Automation from '../components/automation/Automation.vue'

import QuemSomos from '../components/quemSomos/QuemSomos.vue'

import FaleConosco from '../components/faleConosco/FaleConosco.vue'

import DashMain from '../components/dashMain/DashMain.vue'

import Agro from '../components/agro/Agro.vue'
import DashAgro from '../components/dashAgro/DashAgro.vue'

// Smart Farm (18/09/23)
import FazendasDash from '../components/dashAgro/smartFarm/FazendasDash.vue'
import Fazenda from '../components/dashAgro/smartFarm/Fazenda.vue' // Smart Farm (19/09/23)
import ParamFarm from '../components/dashAgro/smartFarm/ParamFarm.vue' // Smart Farm (19/09/23)

//import Lora from '../components/lora/Lora.vue' // Pág LoRa (11/07/24)
//import PageLora from '../components/lora/PageLora.vue' // Pág LoRa (20/08/24)

//import ContadorAguaPageV2 from '../components/contadorAguaPage/ContadorAguaPageV2.vue' // (04/09/24)
import ContadorAguaPageV3 from '../components/contadorAguaPage/v3/ContadorAguaPageV3.vue' // (13/01/25) 20/01/2025
import Geral from '../components/contadorAguaPage/v3/Geral.vue' // (13/01/25) 20/01/2025
//import Consumidores from '../components/contadorAguaPage/Consumidores.vue' // (13/01/25)
import PainelMalhas from '../components/contadorAguaPage/v3/PainelMalhas.vue' // 20/01/2025
import Malhas from '../components/contadorAguaPage/v3/Malhas.vue' // 20/01/2025
import PainelGrupos from '../components/contadorAguaPage/v3/PainelGrupos.vue' // 21/01/2025
import Grupos from '../components/contadorAguaPage/v3/Grupos.vue' // (13/01/25) 20/01/2025
import Medidores from '../components/contadorAguaPage/v3/Medidores.vue' // 21/01/2025
import PainelMedidores from '../components/contadorAguaPage/v3/PainelMedidores.vue' // 22/01
import EntradaM from '../components/contadorAguaPage/v3/EntradaM.vue' // 22/01
import SaidaM from '../components/contadorAguaPage/v3/SaidaM.vue' // 22/01
//import Classes from '../components/contadorAguaPage/Classes.vue' // (13/01/25)
import PesquisaCA from '../components/contadorAguaPage/v3/Pesquisa.vue' // 22/02/25

import GatewayPageComercial from '../components/gateway/GatewayPageComercial.vue' // (12/09/24)

import MonitorComercial from '../components/monitor/MonitorComercial.vue' // (12/09/24)

import MainExibServ from '../components/exibServ/MainExibServ.vue' // 24/09/2024, 03/10/2024

import Aqua from '../components/aqua/Aqua.vue' // 09/12/2024


const routes = [
  /*{
    path: '/',
    name: 'Main',
    component: Main
  },*/
  {
    path: '/',
    name: 'MainV2',
    component: MainV2
  },
  {
    path: '/quemSomos',
    name: 'QuemSomos',
    component: QuemSomos
  },
  {
    path: '/smartgarden',
    name: 'SmartGarden',
    component: SmartGarden
  },
  {
    path: '/fale',
    name: 'FaleConosco',
    component: FaleConosco
  },
  {
    path: '/dashmain',
    name: 'DashMain',
    component: DashMain
  },
  {
    path: '/aquaponia',
    name: 'Aqua',
    component: Aqua
  },
  {
    path: '/ca',
    //name: 'ContadorAguaPageV3',
    component: ContadorAguaPageV3,
    meta: { label: 'Sistema', enabled: false },
    children: [
      {
        path: '', // Subrota padrão
        name: 'Geral',
        component: Geral,
      },
      {
        path: 'pesquisaca', // Subrota "/ca/pesquisa"
        name: 'PesquisaCA',
        component: PesquisaCA,
        meta: { label: 'PesquisaCA'},
      },
      {
        path: 'malhas', // Subrota "/ca/malhas"
        //name: 'PainelMalhas',
        component: PainelMalhas,
        props: true, // Passa o parâmetro 'id' como prop para o componente
        meta: { label: 'Editar'},
        children: [
          {
            path: '', // Sub-subrota aninhada "/"
            name: 'malha',
            component: Malhas,
            //props: true, // Passa idMalha como prop
            meta: { label: 'Malhas' },
          },
          {
            path: ':idMalha/grupos', // Sub-subrota ""
            //name: 'grupos',
            component: PainelGrupos,
            props: true, // Passa idMalha como prop
            meta: { label: 'Malha'},
            children: [
              {
                path: '',
                name: 'grupos',
                component: Grupos,
                meta: { label: 'Grupos'},
              },
              {
                path: ':idGrupo/medidores',
                component: PainelMedidores,
                props: true,
                meta: { label: 'Grupo'},
                children: [
                  {
                    path: '',
                    //name: 'medidores',
                    component: Medidores,
                    props: true,
                    meta: { label: 'Todos os medidores' },
                  },
                  {
                    path: 'entrada/:idIN',
                    name: 'entrada',
                    component: EntradaM,
                    props: true,
                    meta: { label: 'Entrada'},
                  },
                  {
                    path: 'saida/:idOUT',
                    name: 'saida',
                    component: SaidaM,
                    props: true,
                    meta: { label: 'Saída'},
                  },
                ]
              },
            ]
          },
        ],
      },
    ],
  },
  {
    path: '/gatewaycomercial',
    name: 'GatewayPageComercial',
    component: GatewayPageComercial
  },
  {
    path: '/monitorc',
    name: 'MonitorComercial',
    component: MonitorComercial
  },
  {
    path: '/automation',
    name: 'Automation',
    component: Automation
  },
  {
    path: '/agro',
    name: 'Agro',
    component: Agro
  },
  {
    path: '/dashagro',
    name: 'DashAgro',
    component: DashAgro
  },
  {
    path: '/smartfarm',
    name: 'FazendasDash',
    component: FazendasDash
  },
  {
    path: '/land',
    name: 'Fazenda',
    component: Fazenda
  },
  {
    path: '/param',
    name: 'ParamFarm',
    component: ParamFarm
  },
  /*{
    path: '/lora',
    name: 'PageLora',
    component: PageLora
  },*/
  {
    path:'/exib',
    name:'MainExibServ',
    component: MainExibServ
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/* Antes de cada navegação a função é chamada */
import store from '@/store/index.js'
//import { component } from 'vue/types/umd.js'
router.beforeEach((to, from , next) => {

  //console.log('Em rota...')
  store.commit('init') // despertar api.

  if(to.path == '/') {

    // -- Quando main for chamado -> Então esconder menu superior (priorizando a exib. página main). 
    store.state.flagMenuSup = false
  }
  /*else{

    store.state.authForShow = false // se não estiver => auth blocked
  }

  //console.log('Estou na home:', store.state.authForShow)
  
  store.commit('updateCartList') // sem param
  */

  next() // sem a chamada next() a rota é travada.

})

export default router

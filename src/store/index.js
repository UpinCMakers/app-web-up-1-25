import { createStore } from 'vuex'

import axios from 'axios'
//import { raw } from 'core-js/core/string'

export default createStore({
  state: {

    buffer_aux:'', // para uso geral.
    flagMenuSup:false, // flag menu sup small 03/09/2024
    flagLogadoDash:false, // 10/09/2024
    contentUser:{}, // 10/09/2024

    // -- main -------------------------------------------------------------------------------------------- //
    pathAxiosGetx:'https://api-up-23-1.onrender.com/xgxetxixp',
    pathAxiosInit:'https://api-up-23-1.onrender.com',

    // -- maker -------------------------------------------------------------------------------------------- //
    pathAxiosMaker:'https://xapixxup.herokuapp.com/xupxmaker',

    // -- loja -------------------------------------------------------------------------------------------- //
    pathAxiosLojaSuporteA:'https://api-up-23-1.onrender.com/suportesendemail', // A

    pathAxiosLojaPerson:'https://xapixxup.herokuapp.com/xupxlojaxinputxemail',
    flagPageLoja:'lojaMain', // 'lojaProdutos','lojaQuemSomos','lojaSuporte','produto'
    idProdLoja:-1, // init sem produto selecionado, que inicia em 0.
    liProdsLoja:[
      {
        'i':0,
        'categ':'laser',
        'tit': `Chaveiro (porta-chaves) Spotify`,
        'src':require('../assets/chaveiroSpotify.png'), 
        'desc':'Você pode personalizar qualquer formato de objeto e gravar a sua música. A gravação permite que você esteja sempre com a sua música e a dispare sempre que sentir falta do sentimento que ela traz.', 
        'opções':
        [
          {
            'label_desc':'Escreva a música que você quer gravar',
            'img_desc':'', // esse produto não rcb img como parâmetro.
            'material': [
              'madeira MDF cor branca (recomendado)',
              'madeira MDF','Acrílico preto transparente'
            ],
            'pr_ref_material':[
              {
                'ref_m2':240,
                'pr_ref_m2':3.3
              },
              {
                'ref_m2':200,
                'pr_ref_m2':3.7
              },
              {
                'ref_m2':60,
                'pr_ref_m2':5.5
              }
            ], // preço base para o cálculo do custo do material escolhido.
            'tamanho': [
              'Pequeno (10x40x3 mm)',
              'Médio (20x60x3 mm)',
              'Grande (30x100x3 mm)'
            ],
            'tam_ref_material':[ // milímetro [mm]
              {
                'altura':10,
                'largura':40,
                'profundidade':3,
              },
              {
                'altura':20,
                'largura':60,
                'profundidade':3,
              },
              {
                'altura':30,
                'largura':100,
                'profundidade':3,
              },
            ], // tamanho (float) para o cálculo.
          }
        ]
      },
      {'i':1, 'categ':'laser', 'tit': `Retrato em madeira`, src:require('../assets/ftpersoni.jpeg'), 'desc':'Imprima a sua foto preferida em madeira. Faça diferente, deixe aquele momento registrado de maneira surpreendente.', 'opções':[{'material':['madeira MDF'],'tamanho':['Pequeno (90x90x3 mm)','Médio (160x160x3 mm)','Grande (220x220x3 mm)'],'formato':['Quadrado','Circular']}]},
      {'i':2, 'categ':'laser', title: `two`, src:require('../assets/mad1.jpeg'), content: `Content2`},
      {'i':3, 'categ':'laser', title: `three`, src:require('../assets/qrcode_sg.jpeg'), content: `Content3`},
      {'i':4, 'categ':'3d', title: `Responsive`, src:require('../assets/3dex1.jpeg'), content: `Content1`},
      {'i':5, 'categ':'3d', title: `Responsive`, src:require('../assets/letreiro.jpeg'), content: `Content1`},
      {'i':6, 'categ':'3d', title: `three`, src:require('../assets/3dex.jpeg'), content: `Content10`}
    ],

    artigoCurrent:{}, // json dinâmico. Recebe o prod em edição.

    // A imagem deve ter ~(1000x750)
    img_parallax:require('../assets/lab9r.jpg'), // '../assets/ica2.jpg'

    // flag de controle da visualização da expansão do conteúdo.
    flagExpContent:false,
    infoCardContent:null,

    // LISTA CARRINHO.
    flagCartParaAnalise:false, // sinaliza se o pdd será analisado ou se ele pode ser concluído diretamente.
    flagPayPage:false, // sinaliza se está a ocorrer uma tentativa de pagamento.
    liCartGlobal:[
      /*{
        'name':'Chaveiro (porta-chaves) Spotify',
        'material':'Madeira MDF Branca',
        'tam':'Pequeno (10x40x3 mm)',
        'desc':'Pequenos chaveiros com as músicas x, y e z',
        'qnt':3,
        'pr':12.06,
        'hoverEdit':'rgb(31,122,177)',
        'hoverEditBorder':'1px solid rgb(31,122,177)',
        'desconto':0,
        'subtotal':0,
      },
      {
        'name':'Chaveiro (porta-chaves) Spotify',
        'material':'Madeira MDF Branca',
        'tam':'Pequeno (10x40x3 mm)',
        'desc':'Pequenos chaveiros com as músicas x, y e z',
        'qnt':5,
        'pr':15.42,
        'hoverEdit':'rgb(31,122,177)',
        'hoverEditBorder':'1px solid rgb(31,122,177)',
        'desconto':0,
        'subtotal':0,
      }*/
    ],
    pr_inicialCartGlobal:0,
    descontoCartGlobal:0,
    subtotalCartGlobal:0,
    impostoCartGlobal:0,
    pr_finalCartGlobal:0,
    // --- LISTA cl (simular con server)
    flagOpSubmitPdd:false,
    li_simu_cl:[
      {
        'id_cl':1001,
        'email_cl':'teste0@gmail.com',
        'nome_cl':'',
        'pass_cl':'',
        'endereco_cl':'',
        'fone_cl':'',
        'pedidos':[
          {
            'id_pdd':101,
            'date_pdd':'01/01/2001',
            'status_pdd':'Pagamento em análise',
            'desconto':0.30,
            'subtotal':10.0, // mínimo 10 euros.
            'imposto':2.3,
            'prFinal':12.3,
            'pdd':[
              {}, // produto 1.
              {}, // produto 2.
            ]
          },
          {}, // pedido 2.
        ],
        'status':'fechado'
      },
      {
        'id_cl':1002,
        'email_cl':'teste1@gmail.com',
        'nome_cl':'upinc',
        'pass_cl':'testeç',
        'endereco_cl':'Rua teste nº30 2C',
        'fone_cl':'995 559 959',
        'pedidos':[
          {
            'id_pdd':101,
            'date_pdd':'01/01/2001',
            'status_pdd':'Pagamento em análise', // 'Orçamento em análise', 'Aprovado', 'Em produção', 'Enviado', 'Entregue'
            'desconto':1.2,
            'subtotal':10.0, // mínimo 10 euros.
            'imposto':2.3,
            'prFinal':12.3,
            'pdd':[
              {
                'name':'Quadro em madeira',
                'material':'Madeira MDF',
                'tam':'160x160x3 [mm]',
                'desc':'Posicionar a foto centralizada e deixar margem de 10mm', // (!)
                'qnt':1,
                'pr':5.6,
                'hoverEdit':'rgb(31,122,177)',
                'hoverEditBorder':'1px solid rgb(31,122,177)',
                'desconto':0.60,
                'subtotal':5.0, // mínimo 10 euros.
                'imposto':1.15,
                'prFinal':6.15
              },
              {
                'name':'Quadro em madeira (TESTE 2)',
                'material':'Madeira MDF',
                'tam':'160x160x3 [mm]',
                'desc':'Posicionar a foto centralizada e deixar margem de 10mm', // (!)
                'qnt':1,
                'pr':5.6,
                'hoverEdit':'rgb(31,122,177)',
                'hoverEditBorder':'1px solid rgb(31,122,177)',
                'desconto':0.60,
                'subtotal':5.0, // mínimo 10 euros.
                'imposto':1.15,
                'prFinal':6.15
              },
            ]
          }
        ],
        'status':'fechado'
      },
      {
        'id_cl':1003,
        'email_cl':'teste2@gmail.com',
        'nome_cl':'',
        'pass_cl':'',
        'endereco_cl':'',
        'fone_cl':'',
        'pedidos':[
          {
            'id_pdd':101,
            'date_pdd':'01/01/2001',
            'status_pdd':'Pagamento em análise',
            'desconto':0.30,
            'subtotal':10.0, // mínimo 10 euros.
            'imposto':2.3,
            'prFinal':12.3,
            'pdd':[
              {}, // produto 1.
              {}, // produto 2.
            ]
          }
        ],
        'status':'fechado'
      },
    ],

    // login pagina cliente e-commerce | AreaCliente.vue é o main.
    flagPageLoginCl:true, // false => DESabilitar componente de login PainelLogin.vue
    //flagPageCl:false, // true => HAbilitar componente página cliente.
    // JA EXISTE A $store.state.flagPageLoja == 'areaCliente' PARA ABLE PAGE.
    flagCadastroUser:false, // indica componente cadastro atividado.

    // navegação entre páginas página clientes.
    flagCl:'main', // main == flag init

    info_cl:{}, // clBody ou info_cl ? qual é o titular ? => info_cl !

    //clBody:{
    // 'nome':'',
    //  'pass':'', // sempre vazia!
    //  'email':'',
    //  'endereco':'',
    //  'fone':'',
    //  'hist':[],
    //},

    // menu maker
    titBtn0:'',
    titBtn1:'',
    titBtn2:'',

    // -- LoRa -------------------------------------------------------------------------------------------- //
    //pathAxiosGetLora:'https://api-up-23-1.onrender.com/xgetxinfolorax',
    pathAxiosGetMV:'https://api-up-23-1.onrender.com/xgetxinfoxmvx',
    pathAxiosGetTH:'https://api-up-23-1.onrender.com/xgetxinfoxthx',
    pathAxiosGetLoraPriv:'https://api-up-23-1.onrender.com/xgetxinfoloraprivx',

    // -- AGRO -------------------------------------------------------------------------------------------- //
    pathAxiosGetPerfilDash:'https://api-up-23-1.onrender.com/calldashagro', // call init dash agro, after login.
    pathAxiosAgroFarmEstA:'https://api-up-23-1.onrender.com/farmteste', // A (teste de rcb krig)
    pathAxiosGetFarm:'https://api-up-23-1.onrender.com/getfarm',
    pathAxiosGetParamFarm:'https://api-up-23-1.onrender.com/xmagicgetx', // POST to get info param.
    pathAxiosLoginAgro:'https://api-up-23-1.onrender.com/xloginagrox',
    pathAxiosChangeParam:'https://api-up-23-1.onrender.com/xupdatexsevenx', // GET to fill all last 7 params.
    pathAxiosChangeP2Param:'https://api-up-23-1.onrender.com/xupdatexseven2x',

    pathAxiosGetParamFarmV2:'https://api-up-23-1.onrender.com/xgetxfarmv2x', // 01/10/2024.
    param_values:[], // 01/10/2024.
    param_dates:[], // 01/10/2024.

    liGridKrigOrd:[],

    //flagLogadoDashAgro:false, // 10/09/2024 (descontinuado)
    flagInt_selectDashAgro:0, // indicador do menu lateral.

    flagCadastroUserAgro:false, // indica cadastro ativado.

    dinanWidthExib:'80%', // inicia o menu laterial fechado (escondido).
    flagMenuSmall:false, // menu lateral small inicia fechado. => "box exib content" inicia aberto.

    // PERFIL DASH AGRO PAGE.
    flag_loading_perfil_dash_agro:true,
    perfil_agro_nome:'',
    perfil_agro_email:'',
    perfil_agro_servicos:[],
    perfil_agro_suporte:[],
    perfil_agro_notific:[],
    perfil_agro_chat_log:[],

    // FARM PAGE.
    flag_loading_init_farm:true, // inicia em loading... ~select farm~
    flag_loading_farm:true, // inicia em loading... ~info farm selected~
    farm_li_names:[], // lista de nomes dos terrenos disponíveis. ~select farm~
    global_indexFarm:0, // init == 0
    farm_name:'',
    farm_img:'',
    farm_desc:'',
    farm_area:'',
    farm_perimetro:'',
    farm_logs:[],

    // PARAM FARM PAGE.
    flag_loading_param_farm:true, // sempre inicia em loading...
    param_selected:'Nenhum parâmetro selecionado',
    un_param_selected:'', // unidade de medida do param.
    param_distrib:'', // img large
    param_distrib_s:'', // img small
    param_z_manejo:'', // series_z
    param_z_op_manejo:'', // options_z
    param_hist_bar:'', // series_m
    param_hist_op_bar:'', // options_m
    param_chat_log:[], //
    seriesB:[], // gráfico de range (alcance). CandlesFarmB.vue
    li_labels_processed:[], // labels date raw.
    li_data_processed:[], // dados raw.

    // CONTADOR DE AGUA PAGE (teste local 2 - 05/09/2024)
    pathAxiosGetCA:'https://api-up-23-1.onrender.com/xgetxwaterx',
    liContadores:[
      {
          'classe':'Centro (Covilhã)',
          'liContadores':[
              {
                  'id':'c1',
                  'nome':'Casa n12 rc',
                  'classe':'Centro (Covilhã)',
                  'lileituras':[
                      {
                          'data':'05/06/2024',
                          'leitura':'123280'
                      },
                      {
                          'data':'05/07/2024',
                          'leitura':'123000'
                      },
                      {
                          'data':'05/08/2024',
                          'leitura':'123320'
                      },
                      {
                          'data':'05/09/2024',
                          'leitura':'123295'
                      }
                  ],
                  'coord':[40.279184, -7.504404],
              },
              {
                  'id':'c2',
                  'nome':'Casa n11 1D',
                  'classe':'Centro (Covilhã)',
                  'lileituras':[
                      {
                          'data':'05/09/2024',
                          'leitura':'123654'
                      }
                  ],
                  'coord':[40.279184, -7.504404],
              },
          ],
      },
      {
          'classe':'Biquinha (Covilhã)',
          'liContadores':[
              {
                  'id':'c3',
                  'nome':'Casa n87 2E',
                  'classe':'Centro (Covilhã)',
                  'lileituras':[
                      {
                          'data':'05/09/2024',
                          'leitura':'123654'
                      }
                  ],
                  'coord':[40.279184, -7.504404],
              },
              {
                  'id':'c4',
                  'nome':'Casa n87 2D',
                  'classe':'Centro (Covilhã)',
                  'lileituras':[
                      {
                          'data':'05/09/2024',
                          'leitura':'123654'
                      }
                  ],
                  'coord':[40.279184, -7.504404],
              },
              {
                  'id':'c5',
                  'nome':'Casa n87 3E',
                  'classe':'Centro (Covilhã)',
                  'lileituras':[
                      {
                          'data':'05/09/2024',
                          'leitura':'123654'
                      }
                  ],
                  'coord':[40.279184, -7.504404],
              },
          ],
      },
    ],
    // 05/12/2024
    liMalhas:[
      {
        'id':0,
        'malha':'UPinC Lda',
        'grupos':[
          {
            'id':0,
            'grupo':'grupo sem nome',
            'entradas':[
              {
                'id':0,
                'nome':'up/i1',
                'ultima_leitura':1632.0,
                'instalacao':'03/11/2024',
                'desinstalacao':'-',
                'status':'Ativo',
                'coord':[40.27899076267598,-7.504206597805024],
                'eventos':[
                  {
                    'data':'03/11/2024',
                    'hora':'15:23',
                    'origem':'entrada',
                    'tipo':'Instalação',
                    'nota':'-'
                  },
                ],
                'leituras':[
                  {"data": "03/11/2024", "hora": "15:23", "leitura": 125.28, "rssi": 0, "snr": 0},
                  {"data": "03/11/2024", "hora": "23:23", "leitura": 205.68, "rssi": 0, "snr": 0},
                  {"data": "04/11/2024", "hora": "07:23", "leitura": 247.44, "rssi": 0, "snr": 0},
                  {"data": "04/11/2024", "hora": "15:23", "leitura": 297.6, "rssi": 0, "snr": 0},
                  {"data": "04/11/2024", "hora": "23:23", "leitura": 372.96, "rssi": 0, "snr": 0},
                  {"data": "05/11/2024", "hora": "07:23", "leitura": 410.4, "rssi": 0, "snr": 0},
                  {"data": "05/11/2024", "hora": "15:23", "leitura": 482.4, "rssi": 0, "snr": 0},
                  {"data": "05/11/2024", "hora": "23:23", "leitura": 564.72, "rssi": 0, "snr": 0},
                  {"data": "06/11/2024", "hora": "07:23", "leitura": 630.24, "rssi": 0, "snr": 0},
                  {"data": "06/11/2024", "hora": "15:23", "leitura": 712.8, "rssi": 0, "snr": 0},
                  {"data": "06/11/2024", "hora": "23:23", "leitura": 739.0, "rssi": 0, "snr": 0},
                  {"data": "07/11/2024", "hora": "07:23", "leitura": 793.44, "rssi": 0, "snr": 0},
                  {"data": "07/11/2024", "hora": "15:23", "leitura": 842.4, "rssi": 0, "snr": 0},
                  {"data": "07/11/2024", "hora": "23:23", "leitura": 911.52, "rssi": 0, "snr": 0},
                  {"data": "08/11/2024", "hora": "07:23", "leitura": 961.44, "rssi": 0, "snr": 0},
                  {"data": "08/11/2024", "hora": "15:23", "leitura": 1051.68, "rssi": 0, "snr": 0},
                  {"data": "08/11/2024", "hora": "23:23", "leitura": 1128.24, "rssi": 0, "snr": 0},
                  {"data": "09/11/2024", "hora": "07:23", "leitura": 1225.44, "rssi": 0, "snr": 0},
                  {"data": "09/11/2024", "hora": "15:23", "leitura": 1308.48, "rssi": 0, "snr": 0},
                  {"data": "09/11/2024", "hora": "23:23", "leitura": 1370.4, "rssi": 0, "snr": 0},
                  {"data": "10/11/2024", "hora": "07:23", "leitura": 1488.0, "rssi": 0, "snr": 0},
                  {"data": "10/11/2024", "hora": "15:23", "leitura": 1558.08, "rssi": 0, "snr": 0},
                  {"data": "10/11/2024", "hora": "23:23", "leitura": 1632.0, "rssi": 0, "snr": 0}
                ],                
              },
            ],
            'saidas':[
              {
                'id':0,
                'nome':'up/o1',
                'ultima_leitura':680,
                'instalacao':'03/11/2024',
                'desinstalacao':'-',
                'status':'Ativo',
                'coord':[40.27899076267598,-7.504206597805024],
                'eventos':[
                  {
                    'data':'03/11/2024',
                    'hora':'15:23',
                    'origem':'saida',
                    'tipo':'Instalação',
                    'nota':'-'
                  },
                ],
                'leituras':[
                  {
                    'data':'03/11/2024',
                    'hora':'15:23',
                    'leitura':52.2,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'03/11/2024',
                    'hora':'23:23',
                    'leitura':85.7,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'04/11/2024',
                    'hora':'07:23',
                    'leitura':103.1,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'04/11/2024',
                    'hora':'15:23',
                    'leitura':124,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'04/11/2024',
                    'hora':'23:23',
                    'leitura':155.4,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'05/11/2024',
                    'hora':'07:23',
                    'leitura':171,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'05/11/2024',
                    'hora':'15:23',
                    'leitura':201,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'05/11/2024',
                    'hora':'23:23',
                    'leitura':235.3,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'06/11/2024',
                    'hora':'07:23',
                    'leitura':262.6,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'06/11/2024',
                    'hora':'15:23',
                    'leitura':297,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'06/11/2024',
                    'hora':'23:23',
                    'leitura':307.9,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'07/11/2024',
                    'hora':'07:23',
                    'leitura':330.6,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'07/11/2024',
                    'hora':'15:23',
                    'leitura':351,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'07/11/2024',
                    'hora':'23:23',
                    'leitura':379.8,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'08/11/2024',
                    'hora':'07:23',
                    'leitura':400.6,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'08/11/2024',
                    'hora':'15:23',
                    'leitura':438.2,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'08/11/2024',
                    'hora':'23:23',
                    'leitura':470.1,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'09/11/2024',
                    'hora':'07:23',
                    'leitura':510.6,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'09/11/2024',
                    'hora':'15:23',
                    'leitura':545.2,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'09/11/2024',
                    'hora':'23:23',
                    'leitura':571,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'10/11/2024',
                    'hora':'07:23',
                    'leitura':620,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'10/11/2024',
                    'hora':'15:23',
                    'leitura':649.2,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'10/11/2024',
                    'hora':'23:23',
                    'leitura':680,
                    'rssi':0,
                    'snr':0
                  },
                ],
              },
              {
                'id':1,
                'nome':'up/m2',
                'ultima_leitura':650,
                'instalacao':'03/11/2024',
                'desinstalacao':'-',
                'status':'Ativo',
                'coord':[40.279003040306016, -7.503954470157624],
                'eventos':[
                  {
                    'data':'03/11/2024',
                    'hora':'15:23',
                    'origem':'medidor',
                    'tipo':'Instalação',
                    'nota':'-'
                  },
                  {
                    'data':'05/11/2024',
                    'hora':'17:40',
                    'tipo':'Alarme',
                    'nota':'Fluxo inverso'
                  },
                ],
                'leituras':[
                  {
                    'data':'03/11/2024',
                    'hora':'15:23',
                    'leitura':22.2,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'03/11/2024',
                    'hora':'23:23',
                    'leitura':55.7,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'04/11/2024',
                    'hora':'07:23',
                    'leitura':83.1,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'04/11/2024',
                    'hora':'15:23',
                    'leitura':94,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'04/11/2024',
                    'hora':'23:23',
                    'leitura':125.4,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'05/11/2024',
                    'hora':'07:23',
                    'leitura':141,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'05/11/2024',
                    'hora':'15:23',
                    'leitura':171,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'05/11/2024',
                    'hora':'23:23',
                    'leitura':205.3,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'06/11/2024',
                    'hora':'07:23',
                    'leitura':232.6,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'06/11/2024',
                    'hora':'15:23',
                    'leitura':267,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'06/11/2024',
                    'hora':'23:23',
                    'leitura':277.9,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'07/11/2024',
                    'hora':'07:23',
                    'leitura':300.6,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'07/11/2024',
                    'hora':'15:23',
                    'leitura':321,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'07/11/2024',
                    'hora':'23:23',
                    'leitura':349.8,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'08/11/2024',
                    'hora':'07:23',
                    'leitura':370.6,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'08/11/2024',
                    'hora':'15:23',
                    'leitura':408.2,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'08/11/2024',
                    'hora':'23:23',
                    'leitura':440.1,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'09/11/2024',
                    'hora':'07:23',
                    'leitura':480.6,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'09/11/2024',
                    'hora':'15:23',
                    'leitura':515.2,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'09/11/2024',
                    'hora':'23:23',
                    'leitura':541,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'10/11/2024',
                    'hora':'07:23',
                    'leitura':590,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'10/11/2024',
                    'hora':'15:23',
                    'leitura':619.2,
                    'rssi':0,
                    'snr':0
                  },
                  {
                    'data':'10/11/2024',
                    'hora':'23:23',
                    'leitura':650,
                    'rssi':0,
                    'snr':0
                  },
                ],
              },
            ],
          }
        ]
      },
    ],
    jTmpMalha:{ // aux movimentação rápida no front.
      'idMalha':0,
      'malha':'',
      'idGrupo':0,
      'grupo':'',
      'idIN':0,
      'entrada':'',
      'idOUT':0,
      'saida':'',
    },
    widthDinamCA:'75%', // tam dinamico largura pagina CA
    LarguraPageCA:501, // largura init (tam large implica menu com cobertura 25%)
    flagExib:true, // init versao large

    // VALVE
    pathAxiosPostValve:'https://api-up-23-1.onrender.com/xpostxvalvex',
    pathAxiosGetValves:'https://api-up-23-1.onrender.com/xgetxvalvesx',
    pathAxiosGetValvesAg:'https://api-up-23-1.onrender.com/xgetxvalvesxagx',
    pathAxiosUpValvesAg:'https://api-up-23-1.onrender.com/xupxvalvesxagx',
    pathAxiosUpSensorControl:'https://api-up-23-1.onrender.com/xupxsensorxcontrolx',
    pathAxiosGetSensorControl:'https://api-up-23-1.onrender.com/xgetxsensorxcontrolx',
    pathAxiosGetSensorBtn:'https://api-up-23-1.onrender.com/xgetxsensorxbtnlastx',

    //
    pathAxiosSmartGarden:'https://api-up-23-1.onrender.com/xgetxsmartgardenv2x',
  },
  mutations: {
    init(state) {
      axios.get(state.pathAxiosInit).then(function (res) {

        //state.buffer_aux = res.data.result // usado para desabilitar print abaixo 21/10/23.
        //console.log(res.data.result)
        if(res.data.result == 'init') { console.log('check') } else { console.log('error-check') }
        // desabilitar 'check' ?
      })
    },
    srcIP(state) {
      axios.get(state.pathAxiosGetx).then(function (res) {

        console.log(res.data.result)
      })
    },
    srcIPmaker(state) {
      axios.get(state.pathAxiosMaker).then(function (res) {

        console.log(res.data.result)
      })
    },
    srcIPloja(state) {
      axios.get(state.pathAxiosLoja).then(function (res) {

        console.log(res.data.result)
      })
    },
    startChange(state,payload) {
      axios.post(state.pathAxiosChangeParam,payload).then(function (res) {
        //console.log('---')
        //console.log('change/update 7 param')
        console.log('---')
        console.log(res.data.result)
        console.log(' ')
      })
    },
    startChange_p2(state) {
      var payload = {'test':'send'}
      axios.post(state.pathAxiosChangeP2Param,payload).then(function (res) {
        //console.log('---')
        //console.log('change/update 7 param')
        console.log('--- p2 ---')
        console.log(res.data.result)
        console.log(' ')
      })
    },
  },
  actions: {
  },
  modules: {
  }
})

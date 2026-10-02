// Todo o conteúdo editável do site fica aqui.
// Itens marcados com TODO dependem de informações pendentes (ver README > Pendências).
import civil1200 from './assets/photos/civil-1200.webp'
import civil2400 from './assets/photos/civil-2400.webp'
import consumidor1200 from './assets/photos/consumidor-1200.webp'
import consumidor2400 from './assets/photos/consumidor-2400.webp'
import contratos1200 from './assets/photos/contratos-1200.webp'
import contratos2400 from './assets/photos/contratos-2400.webp'
import pampulha1200 from './assets/photos/pampulha-1200.webp'
import pampulha2400 from './assets/photos/pampulha-2400.webp'

// Retrato da advogada: aparece no Sobre assim que o arquivo existir em src/assets/photos/
const portraitFile = Object.values(import.meta.glob('./assets/photos/giulia-faraj-adv.{png,jpg,jpeg,webp}', { eager: true, import: 'default' }))[0]
export const portrait = portraitFile ? { src: portraitFile, alt: 'Retrato de Giulia Faraj, advogada' } : null

export const lawyer = {
  name: 'Giulia Faraj',
  oab: 'OAB/MG 232.918',
  email: 'giuliafaraj3@gmail.com',
  whatsapp: '5531997736303',
  whatsappDisplay: '(31) 99773-6303',
  address: 'Vespasiano, Centro',
  state: 'MG',
}

export function whatsappUrl(topic) {
  const text = topic
    ? `Olá, Dra. Giulia. Vim pelo site e gostaria de conversar sobre uma questão de ${topic}.`
    : 'Olá, Dra. Giulia. Vim pelo site e gostaria de agendar uma reunião online.'
  return `https://wa.me/${lawyer.whatsapp}?text=${encodeURIComponent(text)}`
}

export const nav = [
  { label: 'Áreas', href: '#areas' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Contato', href: '#contato' },
]

const photo = (src1200, src2400, alt) => ({ src: src2400, srcSet: `${src1200} 1200w, ${src2400} 2400w`, alt })

// Um banner por área. A roseta de guilhoché muda de desenho com a área.
export const areas = [
  {
    id: 'civil',
    tab: 'Direito Civil',
    short: 'Civil',
    topic: 'Direito Civil',
    title: ['Seus direitos,', 'tratados com rigor.'],
    lead: 'Indenizações, responsabilidade civil e obrigações, com análise cuidadosa antes de qualquer passo.',
    text: 'Danos materiais e morais, responsabilidade civil, obrigações, posse e propriedade. Cada situação é estudada a fundo antes de qualquer medida, para que você decida com informação.',
    topics: ['Indenizações', 'Responsabilidade civil', 'Obrigações', 'Posse e propriedade'],
    photo: photo(civil1200, civil2400, 'Alameda de palmeiras imperiais da Praça da Liberdade, em Belo Horizonte'),
    focus: '62% 50%',
    rosette: { petals: 18, depth: 16, rings: 5 },
  },
  {
    id: 'contratos',
    tab: 'Contratos',
    short: 'Contratos',
    topic: 'Contratos',
    title: ['Contratos claros', 'evitam conflitos.'],
    lead: 'Elaboração, revisão e negociação para pessoas e empresas, em linguagem que você entende.',
    text: 'Elaboração, revisão e negociação de contratos civis e empresariais. O objetivo é que cada cláusula diga exatamente o que as partes combinaram, prevenindo disputas antes que elas existam.',
    topics: ['Elaboração', 'Revisão', 'Negociação', 'Contratos empresariais'],
    photo: photo(contratos1200, contratos2400, 'Duas pessoas assinando um contrato sobre uma mesa escura'),
    focus: '58% 45%',
    rosette: { petals: 24, depth: 12, rings: 6 },
  },
  {
    id: 'consumidor',
    tab: 'Direito do Consumidor',
    short: 'Consumidor',
    topic: 'Direito do Consumidor',
    title: ['Cobrança indevida?', 'Existem caminhos.'],
    lead: 'Orientação sobre práticas abusivas, negativação e vícios de produto ou serviço, sem juridiquês.',
    text: 'Cobranças indevidas, negativação, vícios de produto ou serviço e práticas abusivas. Você entende seus direitos e os caminhos possíveis, com orientação direta e sem promessas vazias.',
    topics: ['Cobranças indevidas', 'Negativação', 'Práticas abusivas', 'Vícios de produto'],
    photo: photo(consumidor1200, consumidor2400, 'Pessoa caminhando com uma sacola de compras'),
    focus: '40% 50%',
    mirror: true,
    rosette: { petals: 30, depth: 9, rings: 4 },
  },
]

export const intro = {
  outline: 'Clareza',
  title: 'Direito explicado com clareza. Decisões tomadas com você.',
  text: 'Cada caso começa com escuta e estudo. Você recebe uma leitura honesta da situação, os caminhos possíveis e o que cada um envolve, para decidir com segurança.',
  seal: { label: 'Vasta experiência em direito civil estratégico' },
  facts: [
    'Atuação em Direito Civil, Contratos e Direito do Consumidor.',
    'Bagagem em Direito de Família, Direito Trabalhista e Direito Empresarial.',
    'Formação em Relações Internacionais e intercâmbios na França e no Canadá.',
  ],
}

export const about = {
  title: 'Giulia Faraj',
  role: 'Advogada civilista',
  paragraphs: [
    'Graduada em Direito pela PUC Minas, com vasta experiência em direito civil estratégico, contratos e direito do consumidor, além de bagagem em direito de família, trabalhista e empresarial.',
    'A formação em Relações Internacionais e a vivência no exterior sustentam um olhar internacional sobre cada caso. O atendimento é próximo e direto, em Belo Horizonte e região, com possibilidade de atendimento online para todo o Brasil.',
  ],
  education: [
    { title: 'Direito', detail: 'Graduação, PUC Minas' },
    { title: 'Processo Civil', detail: 'Pós-graduação' },
    { title: 'Contratos', detail: 'Pós-graduação' },
    { title: 'Relações Internacionais', detail: 'PUC Minas, 5 de 8 semestres cursados' },
  ],
  exchanges: [
    { title: 'França', detail: 'Intercâmbio com francês aplicado à área jurídica' },
    { title: 'Canadá', detail: 'Intercâmbio com inglês acadêmico e instrumental' },
  ],
  photo: photo(pampulha1200, pampulha2400, 'Marquise curva da Casa do Baile, na Pampulha, em Belo Horizonte'),
}

export const process = {
  title: 'Do primeiro contato ao contrato, sem surpresas.',
  steps: [
    { title: 'Você conta o caso', text: 'Uma mensagem pelo WhatsApp ou pelo formulário, com um resumo da situação.' },
    { title: 'Conversamos online', text: 'Uma reunião por vídeo para entender documentos, prazos e objetivos.' },
    { title: 'Você recebe a proposta', text: 'Atuação e honorários descritos com clareza, sem letras miúdas.' },
    { title: 'Assinamos o contrato', text: 'Tudo alinhado por escrito, e o trabalho começa.' },
  ],
}

// TODO: inserir os depoimentos reais quando autorizados. Com a lista vazia, a seção não aparece.
export const testimonials = []

export const contact = {
  photo: photo(civil1200, civil2400, ''),
  title: ['Vamos conversar', 'sobre o seu caso.'],
  lead: 'O primeiro passo é uma reunião online. Escolha o canal que preferir.',
  points: ['Reunião online para entender o caso', 'Proposta clara de atuação e honorários', 'Atendimento em BH e região e online para todo o Brasil'],
}

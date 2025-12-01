import React from 'react';
import { Section } from './types';

// Icons for the Journey Section
const MindIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.871 4A17.926 17.926 0 0112 3c4.113 0 7.937 1.401 10.835 3.69.21.165.343.406.354.665v.303c0 .538-.436.973-.973.973H3.783a.973.973 0 01-.973-.973v-.303c.011-.26.144-.5.354-.665A17.926 17.926 0 014.87 4z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 10v1a8 8 0 008 8 8 8 0 008-8v-1m-5 4v1a3 3 0 01-6 0v-1" /></svg>;
const ActionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 8.464a5 5 0 000 7.072m-2.828-9.9a9 9 0 000 12.728m0 0l12.728-12.728" /></svg>;
const ObjectiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>;


// Icons for the "Scope" section
const PageIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>);
const MegaphoneIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>);
const CodeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>);
const StoryIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>);
const ChartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>);
const SaleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-5.513a1.875 1.875 0 0 0-1.642-2.58H5.169m-1.75 0h16.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H2.25" /></svg>);
const LeadsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.226A3 3 0 0 1 18 15.75a3 3 0 0 1-2.25 2.872m-7.5-2.226a3 3 0 0 0 3.741-1.606l-7.447-4.469a3 3 0 0 0-5.232 2.72A9.09 9.09 0 0 0 6 18.72m-1.5-1.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>);
const DatabaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>);


export const sectionsData: Section[] = [
  {
    id: 'visao-geral',
    title: 'O Ponto de Partida: Sua Realidade',
    type: 'default',
    content: [
      'O curso <strong>“Sua Cozinha Lucrativa”</strong> já tem conteúdo e autoridade fortes. O desafio é estruturar o digital para que ele funcione como um negócio previsível.',
      'Nosso objetivo é <strong>ressuscitar o curso</strong> com uma estratégia profissional de tráfego e posicionamento que gera vendas contínuas, transformando sua expertise em um ativo digital lucrativo.'
    ],
  },
  {
    id: 'objetivo-principal',
    title: 'Nosso Objetivo Principal',
    type: 'card-highlight',
    content: 'Transformar o curso “Sua Cozinha Lucrativa” em um produto perpétuo lucrativo, com uma estrutura que atrai, envolve e converte o público certo — donos de buffets e empreendedores gastronômicos.'
  },
   {
    id: 'o-que-sera-feito',
    title: 'O Que Está Incluso no Escopo?',
    type: 'grid',
    columns: [
      {
        title: 'O Que Faremos',
        items: [
          { text: 'Criação de uma Landing Page moderna e otimizada para conversão.', icon: <PageIcon /> },
          { text: 'Configuração de tráfego pago pelo Instagram (Meta Ads).', icon: <MegaphoneIcon /> },
          { text: 'Instalação de pixel e rastreamento completo.', icon: <CodeIcon /> },
          { text: 'Criação de anúncios com storytelling e autoridade.', icon: <StoryIcon /> },
          { text: 'Implementação de relatórios e métricas de desempenho.', icon: <ChartIcon /> }
        ]
      },
      {
        title: 'Resultados Esperados',
        items: [
          { text: 'Vendas diárias do curso via Hotmart.', icon: <SaleIcon /> },
          { text: 'Leads qualificados entrando todos os dias.', icon: <LeadsIcon /> },
          { text: 'Base de dados para futuras mentorias premium.', icon: <DatabaseIcon /> }
        ]
      }
    ]
  },
  {
    id: 'jornada-compra',
    title: 'Jornada de Compra Eficiente',
    type: 'journey',
    journeySteps: [
      {
        title: 'Descoberta',
        mindset: {
          icon: <MindIcon/>,
          title: 'Mentalidade do Cliente',
          items: ['Sente a dor (trabalha muito, lucra pouco, desorganizado), mas não conhece a solução.'],
        },
        action: {
          icon: <ActionIcon />,
          title: 'Nossa Ação',
          items: ['Anúncios focados na dor', 'Reels com situações reais', 'Provas sociais curtas'],
        },
        objective: {
          icon: <ObjectiveIcon />,
          title: 'Objetivo',
          items: ['Despertar consciência, gerar identificação e motivar o clique.'],
        },
      },
      {
        title: 'Interesse Ativo',
        mindset: {
          icon: <MindIcon/>,
          title: 'Mentalidade do Cliente',
          items: ['"Será que isso pode me ajudar de verdade? Como funciona?"'],
        },
        action: {
          icon: <ActionIcon />,
          title: 'Nossa Ação',
          items: ['Landing Page clara e direta', 'Vídeo de conexão com a Chef Selma', 'Benefícios práticos e depoimentos'],
        },
        objective: {
          icon: <ObjectiveIcon />,
          title: 'Objetivo',
          items: ['Transformar curiosidade em interesse real e confiança.'],
        },
      },
      {
        title: 'Consideração',
        mindset: {
          icon: <MindIcon/>,
          title: 'Mentalidade do Cliente',
          items: ['"Vale a pena o investimento? Será que funciona para o meu caso?"'],
        },
        action: {
          icon: <ActionIcon />,
          title: 'Nossa Ação',
          items: ['Mostrar "antes e depois"', 'Responder objeções (tempo, dinheiro)', 'Apresentar bônus e garantias'],
        },
        objective: {
          icon: <ObjectiveIcon />,
          title: 'Objetivo',
          items: ['Eliminar as dúvidas que impedem a compra.'],
        },
      },
      {
        title: 'Decisão',
        mindset: {
          icon: <MindIcon/>,
          title: 'Mentalidade do Cliente',
          items: ['"Vou comprar", mas ainda pode haver um pequeno medo ou hesitação.'],
        },
        action: {
          icon: <ActionIcon />,
          title: 'Nossa Ação',
          items: ['Chamadas de ação fortes', 'Garantia e segurança da Hotmart', 'Checkout simples e com múltiplas formas de pagamento'],
        },
        objective: {
          icon: <ObjectiveIcon />,
          title: 'Objetivo',
          items: ['Tornar o ato da compra rápido, fácil e seguro.'],
        },
      },
      {
        title: 'Compra',
        mindset: {
          icon: <MindIcon/>,
          title: 'Mentalidade do Cliente',
          items: ['Confia no método, na solução e na Chef Selma para guiar o caminho.'],
        },
        action: {
          icon: <ActionIcon />,
          title: 'Nossa Ação',
          items: ['E-mail de boas-vindas com acesso imediato', 'Instruções claras sobre o "primeiro passo"'],
        },
        objective: {
          icon: <ObjectiveIcon />,
          title: 'Objetivo',
          items: ['Proporcionar uma experiência de compra e onboarding profissional.'],
        },
      },
      {
        title: 'Relacionamento',
        mindset: {
          icon: <MindIcon/>,
          title: 'Mentalidade do Cliente',
          items: ['"O que mais posso aprender? Como continuo evoluindo?"'],
        },
        action: {
          icon: <ActionIcon />,
          title: 'Nossa Ação',
          items: ['Conteúdos de apoio', 'Remarketing com dicas e aulas bônus', 'Construção de comunidade'],
        },
        objective: {
          icon: <ObjectiveIcon />,
          title: 'Objetivo',
          items: ['Fidelizar, gerar retenção e preparar para ofertas futuras (mentorias).'],
        },
      },
      {
        title: 'Recomendações',
        mindset: {
          icon: <MindIcon/>,
          title: 'Mentalidade do Cliente',
          items: ['Está satisfeito com os resultados e quer compartilhar com outros colegas.'],
        },
        action: {
          icon: <ActionIcon />,
          title: 'Nossa Ação',
          items: ['Coletar depoimentos em vídeo', 'Criar cases de sucesso para anúncios', 'Incentivar indicações'],
        },
        objective: {
          icon: <ObjectiveIcon />,
          title: 'Objetivo',
          items: ['Transformar alunos satisfeitos em vendedores orgânicos do projeto.'],
        },
      },
    ]
  },
  {
    id: 'publico-alvo',
    title: 'Para Quem Falamos?',
    type: 'grid',
    columns: [
        { title: 'Quem vamos atingir', items: [
            { text: 'Donos de buffet.', icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> },
            { text: 'Chefs e empreendedores gastronômicos.', icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> },
            { text: 'Profissionais que querem transformar sua paixão em negócio lucrativo.', icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.182 0-6.134-.59-8.672-1.649l-1.01 1.01c-.44.44-.44 1.152 0 1.592l3.328 3.328c.44.44 1.152.44 1.592 0l1.01-1.01A23.931 23.931 0 0112 15c3.182 0 6.134-.59 8.672-1.649l1.01 1.01c.44.44.44 1.152 0 1.592l-3.328 3.328c-.44.44-1.152.44-1.592 0l-1.01-1.01M12 3c-1.846 0-3.543.63-4.943 1.733L6.117 3.79c-.44-.44-1.152-.44-1.592 0L1.197 7.118c-.44.44-.44 1.152 0 1.592l1.01 1.01C4.866 10.37 7.818 11 11 11h2c3.182 0 6.134-.63 8.672-1.649l1.01-1.01c.44-.44.44-1.152 0-1.592L19.48 3.79c-.44-.44-1.152-.44-1.592 0l-.943.943C15.543 3.63 13.846 3 12 3z"></path></svg> }
        ] },
        { title: 'O que buscam', items: [
            { text: 'Lucrar mais com o que já fazem.', icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> },
            { text: 'Organizar processos e equipe.', icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg> },
            { text: 'Aprender a precificar e vender melhor.', icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v-3c0-1.105.895-2 2-2h2z"></path></svg> }
        ] }
    ]
  },
  {
    id: 'cronograma',
    title: 'Nosso Plano de Ação (Juntos)',
    type: 'timeline',
    timelineItems: [
        { phase: 'Dia 1-5', title: 'Fase 1: Preparação e Alinhamento', description: 'Alinhamento estratégico profundo, levantamento de acessos e definição das primeiras ofertas para os anúncios.' },
        { phase: 'Dia 6-15', title: 'Fase 2: Lançamento e Testes', description: 'Lançamento das campanhas de tráfego pago. Fase de aprendizado do pixel e teste dos primeiros criativos.' },
        { phase: 'Constante', title: 'Fase 3: Otimização Contínua', description: 'Análise semanal das métricas que importam. Otimização e escala do que funciona para garantir previsibilidade.' },
        { phase: 'Estratégico', title: 'Fase 4: Parceria Estratégica', description: 'Com base nos dados, planejamos os próximos passos, como mentorias e produtos de maior valor.' },
    ]
  },
  {
    id: 'investimento',
    title: 'Investimento Inteligente',
    type: 'pricing',
    pricingNotes: [
        'Contrato minimo de 3 meses',
        'Contrato de 6 meses = 10% de desconto'
    ],
    pricingPlans: [
        {
            name: 'PLANO EDGE',
            price: 'R$ 1097,00',
            features: [
                'Gestão de tráfego pago até R$ 5.000/mês',
                'Criação e estruturação de campanhas no Google Ads e Meta Ads',
                'Monitoramento e ajustes nas campanhas',
                'Relatório mensal com análise dos resultados',
                'Suporte via WhatsApp e e-mail em horário comercial'
            ]
        },
        {
            name: 'PLANO SCALE',
            price: 'R$ 1597,00',
            features: [
                'Gestão de tráfego pago até R$ 8.000/mês',
                'Criação e estruturação de campanhas no Google Ads e Meta Ads',
                'Monitoramento e ajustes nas campanhas',
                'Relatórios quinzenais com dados e insights práticos',
                'Reuniões quinzenais de acompanhamento e alinhamento estratégico',
                'Suporte via WhatsApp e e-mail em horário comercial',
                '1x Consultoria mensal de posicionamento',
                'Orientação Estratégica de atendimentos no WhatsApp'
            ],
            highlight: true
        }
    ]
  },
  {
    id: 'nossa-parceria',
    title: 'Nosso Compromisso com Você',
    type: 'default',
    content: [
      'Mais do que prestadores de serviço, seremos seus <strong>parceiros estratégicos</strong>. Nosso compromisso é com a transparência total. Você terá acesso a relatórios simples, reuniões periódicas e um canal direto para dúvidas. <strong>O seu sucesso é o nosso sucesso.</strong>'
    ]
  },
  {
    id: 'proximos-passos',
    title: 'Próximos Passos',
    type: 'default',
    content: [ 'A estratégia está desenhada. A equipe está pronta. Só falta o seu "SIM" para começarmos a transformação.' ]
  },
];
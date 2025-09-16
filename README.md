# 🥦 Simulador de Microondas

Um simulador interativo de microondas desenvolvido com React, TypeScript e Vite. Experimente uma interface realista com efeitos visuais e sonoros para uma experiência completa de uso de microondas.

## 🚀 Demo Online

<div align="center">

### 🌐 <a href="https://microondas.mklly.com.br/" target="_blank" rel="noopener noreferrer">**VER PROJETO AO VIVO**</a>

<a href="https://microondas.mklly.com.br/" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
</a>

</div>

## ✨ Funcionalidades

### 🎛️ Controles Intuitivos
- **Painel Digital**: Display LED com timer em formato MM:SS
- **Teclado Numérico**: Entrada de tempo personalizada com sistema de 4 dígitos
- **Botões de Controle**: Iniciar, pausar, cancelar e adicionar 30 segundos

### 🍽️ Programas Pré-definidos
- **🥙 Aquecer** - 2 minutos
- **☕ Bebidas** - 2 minutos e 30 segundos  
- **🍿 Pipoca** - 3 minutos
- **🌽 Milho** - 4 minutos
- **🍚 Arroz** - 15 minutos
- **🍟 Batata** - 8 minutos

### 🎵 Experiência Sonora
- **Efeitos Sonoros**: Beep para interações e triplo beep ao finalizar
- **Som Ambiente**: Ruído característico do microondas durante funcionamento
- **Controle de Volume**: Sons otimizados para não incomodar

### 🎨 Interface Visual
- **Animações**: Efeitos visuais durante o funcionamento
- **Responsivo**: Adaptado para desktop e mobile
- **Design Moderno**: Interface clean com Tailwind CSS
- **Feedback Visual**: Indicadores de status (pausado, funcionando)

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/marquesmaycon/microwave.git

# Entre no diretório
cd microondas

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run lint     # Verificação de código
npm run preview  # Preview do build
```

## 🛠️ Tecnologias

### Core
- **React 19** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server

### Estilização
- **Tailwind CSS 4** - Framework CSS utilitário
- **tailwind-merge** - Merge condicional de classes

### Qualidade de Código
- **ESLint** - Linter JavaScript/TypeScript
- **Biome** - Formatter e linter alternativo
- **TypeScript ESLint** - Regras específicas para TS

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/
├── components/          # Componentes React
│   ├── oven.tsx        # Área visual do microondas
│   └── panel.tsx       # Painel de controles
├── microwave/          # Lógica do microondas
│   ├── microwave-context.ts     # Context e types
│   ├── microwave-provider.tsx   # Provider React
│   ├── useMicrowaveTimer.ts     # Hook do timer
│   ├── useMicrowaveSounds.ts    # Hook dos sons
│   └── utils.ts                 # Utilitários
└── App.tsx             # Componente principal
```

### Padrões Utilizados
- **Context API**: Gerenciamento de estado global
- **Custom Hooks**: Lógica reutilizável (timer, sons)
- **Reducer Pattern**: Controle de estado complexo
- **Component Composition**: Separação de responsabilidades

## 🎮 Como Usar

1. **Definir Tempo**: Use o teclado numérico ou selecione um programa
2. **Iniciar**: Clique em "Iniciar 30s" ou pressione após definir tempo
3. **Controlar**: Pause, cancele ou adicione 30 segundos durante funcionamento
4. **Programas**: Selecione um programa pré-definido para uso rápido

## 👨‍💻 Autor

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>
  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
  [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)

  ### Feito com ❤️ e muita 🎵
</div>

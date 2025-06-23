# 📱 Projeto - TWIF

## 1. Visão Geral do Projeto

**Nome do App:**  
TWIF - Conectando a Comunidade IFSP Caraguatatuba

**Descrição Geral:**  
TWIF é uma rede social exclusiva para a comunidade acadêmica do Instituto Federal de São Paulo - Campus Caraguatatuba. Desenvolvida como um projeto integrador por alunos do curso de Informática para Internet, a plataforma permite compartilhar conteúdo, interagir com publicações e conectar estudantes de diferentes cursos.

**Objetivo do Aplicativo:**  
Criar um espaço digital onde os membros da comunidade acadêmica possam compartilhar conhecimento, trocar experiências, fortalecer a identidade institucional e construir uma rede de contatos profissionais desde os primeiros semestres.

**Público-Alvo:**  
Alunos, professores e funcionários do IFSP Campus Caraguatatuba.

**Plataforma Suportada:**
- Android

**Tecnologias Utilizadas:**  
- Framework: React Native (Expo)
- Gerenciamento de Estado: Zustand
- Requisições HTTP: Axios
- Navegação: React Navigation (Stack, Drawer, Bottom Tabs)
- UI: Componentes personalizados, React Native Elements
- Armazenamento Local: Expo SecureStore
- Formatação: Prettier

---

## 2. Arquitetura do Software

**Padrão Arquitetural:**  
O aplicativo segue um padrão de arquitetura baseado em componentes com gerenciamento de estado centralizado via Zustand.

**Camadas do Aplicativo:**
- **UI (Presentation)**: Componentes visuais das páginas e elementos reutilizáveis
- **Estado (State)**: Gerenciamento global via Zustand stores
- **Serviços (Services)**: Comunicação com API e lógica de negócio
- **Configuração (Config)**: Configurações da API e ambiente
- **Utilitários (Utils)**: Funções auxiliares e validações

---

## 3. Estrutura de Pastas do Projeto

```
root/
├── assets/            # Imagens e assets estáticos da raiz
├── src/
│   ├── assets/        # Imagens, fontes e recursos estáticos
│   │   ├── fonts/     # Fontes personalizadas (Gilroy)
│   │   └── imgs/      # Imagens da aplicação
│   ├── components/    # Componentes reutilizáveis
│   │   ├── cardRelatorio/          # Cards para relatórios administrativos
│   │   ├── contentDrawerBurguer/   # Conteúdo do menu lateral
│   │   ├── contentFormPost/        # Formulário para criação de posts
│   │   ├── DefaultModal/           # Modal de confirmação reutilizável
│   │   ├── drawerBurguer/          # Menu lateral (drawer)
│   │   ├── headerComment/          # Cabeçalho da tela de comentários
│   │   ├── headerFeed/             # Cabeçalho da tela do feed
│   │   ├── inputs/                 # Componentes de entrada de dados
│   │   ├── Logo/                   # Componente do logotipo
│   │   ├── modalInputPost/         # Botão flutuante para criar posts
│   │   ├── notification/           # Item de notificação
│   │   ├── post/                   # Componente de post no feed
│   │   ├── ScreenLoader/           # Indicador de carregamento
│   │   ├── sheetFormPost/          # Bottom sheet para criar posts
│   │   ├── SkeletonPost/           # Skeleton para carregamento de posts
│   │   └── Tabs.js                 # Navegação por abas
│   ├── config/        # Configurações do app
│   │   ├── api.js     # Configuração do Axios para API
│   │   └── appConfig.js # Configurações globais
│   ├── constants/     # Constantes utilizadas no app
│   │   ├── colors.js  # Cores padronizadas
│   │   └── fonts.js   # Fontes padronizadas
│   ├── pages/         # Telas do aplicativo
│   │   ├── authLoading/  # Verificação de autenticação inicial
│   │   ├── chooseProfilePicture/ # Seleção de avatar
│   │   ├── comment/   # Visualização e adição de comentários
│   │   ├── feed/      # Feed principal
│   │   ├── Login/     # Autenticação do usuário
│   │   ├── notifications/ # Lista de notificações
│   │   ├── perfil/    # Perfil do usuário
│   │   ├── register/  # Cadastro de novos usuários
│   │   └── relatorio/ # Relatórios administrativos
│   ├── services/      # Serviços e APIs
│   │   ├── authService.js # Autenticação
│   │   ├── imageService.js # Manipulação de imagens
│   │   ├── navigationService.js # Serviço de navegação
│   │   ├── postService.js # CRUD de posts
│   │   ├── relatorioService.js # Dados para relatórios
│   │   ├── storageService.js # Armazenamento local
│   │   └── userService.js # Gestão de usuários
│   ├── stores/        # Gerenciamento de estado (Zustand)
│   │   ├── NotifyStore.js # Estado das notificações
│   │   ├── SheetFormStore.js # Estado do formulário de posts
│   │   └── userStore.js # Estado do usuário logado
│   ├── utils/         # Funções utilitárias
│   │   └── validation.js # Validações de formulários
│   └── routes.js      # Configuração das rotas do aplicativo
├── App.js             # Componente raiz
├── app.json           # Configurações do Expo
├── index.js           # Ponto de entrada do aplicativo
├── package.json       # Dependências do projeto
└── README.md          # Documentação inicial
```

---

## 4. Fluxo de Navegação

**Relação entre Telas:**  
AuthLoading → Login → Register → ChoosePicture → Home (Tabs: Feed/Notificações) → Comment → Perfil → Relatorio (apenas admin)

**Descrição do Fluxo:**
1. O app inicia verificando se há um token válido (AuthLoading)
2. Se não tiver token, direciona para Login
3. Do Login, pode ir para Register
4. Após registro, vai para ChoosePicture
5. Depois da autenticação, vai para Home (Tabs)
6. Na Home, pode navegar para:
   - Comment (ao clicar em um post)
   - Perfil (ao clicar na foto do usuário)
   - Relatorio (apenas administradores, pelo drawer menu)

**Tipos de Navegação Utilizados:**
- Stack Navigator: Para navegação principal entre telas
- Bottom Tab Navigator: Para alternar entre Feed e Notificações
- Drawer Navigator: Menu lateral para acesso a opções adicionais

---

## 5. Casos de Uso / Funcionalidades

- Cadastro e Login de Usuário
  - Login com e-mail institucional (@aluno.ifsp.edu.br ou @ifsp.edu.br)
  - Registro em múltiplas etapas
  - Escolha de avatar personalizado
  
- Feed de Posts
  - Visualização de publicações
  - Pull-to-refresh para atualizar conteúdo
  - Curtir/descurtir posts
  - Acesso aos comentários
  
- Sistema de Comentários
  - Visualização de comentários em posts
  - Criação de novos comentários
  - Exclusão de comentários próprios
  
- Perfil de Usuário
  - Visualização de dados pessoais
  - Lista de posts do usuário
  - Opção de trocar avatar
  - Exibição de informações como curso e data de nascimento
  
- Gerenciamento de Posts
  - Criação de posts (texto)
  - Exclusão de posts próprios
  - Limitação de caracteres
  
- Notificações
  - Notificações de curtidas
  - Notificações de comentários
  - Marcar notificações como lidas
  - Contador de notificações não lidas
  
- Recursos Administrativos
  - Dashboard com estatísticas
  - Visualização de métricas (usuários, posts, interações)
  - Gráficos e insights
  - Moderação de conteúdo

---

## 6. Comunicação com Backend

**API Base:**
- URL: Configurável em 

appConfig.js


**Endpoints Utilizados:**
- Autenticação:
  - POST /auth/login
  - POST /auth/register
  - GET /auth/validate
  - POST /auth/validate-usernick
  - POST /auth/validate-email

- Feed e Posts:
  - GET /feed/posts
  - POST /feed/create/post
  - POST /feed/posts/{id}/like
  - DELETE /feed/delete/post

- Comentários:
  - GET /comments/posts/{id}/comments
  - POST /comments/posts/{id}/comments
  - DELETE /comments/posts/{id}/comments/{commentId}

- Usuários:
  - GET /user/me
  - GET /user/perfil/{userNick}
  - GET /user/notifications
  - PATCH /user/notifications/read

- Imagens:
  - GET /image
  - GET /image/default/{imageName}
  - PATCH /user/troca/avatar/{profilePicture}
  
- Relatórios:
  - GET /relatorios/usuarios
  - GET /relatorios/usuarios/admins
  - GET /relatorios/curtidas
  - GET /relatorios/comentarios
  - GET /relatorios/posts

**Autenticação da API:**  
- JWT (JSON Web Token) enviado como Bearer token no header Authorization
- Interceptor configurado para renovação automática de token em caso de expiração

**Tratamento de Erros:**
- Toast messages para feedbacks visuais
- Redirecionamento para tela de login em caso de erro de autenticação (401, 403)
- Interceptor de erro configurado no Axios

---

## 7. Setup do Ambiente

**Pré-Requisitos:**
- Node.js: v12.0.0 ou superior
- npm ou yarn
- Expo CLI
- Android Studio (para desenvolvimento Android)

**Instalação:**
```bash
# Clonar o repositório
git clone https://github.com/andreluizdasilvaa/Mobile-Twif
cd Mobile-Twif

# Instalar dependências
npm install
# ou
yarn install
```

**Rodar o App:**
```bash
# Iniciar o projeto com Expo
npm start
# ou
yarn start

# Específico para Android
npm run android
# ou
yarn android
```

---

## 8. Segurança

**Autenticação:**  
- JWT (JSON Web Token) para autenticação com o backend
- Verificação de sessão ao iniciar o app

**Armazenamento Seguro:**  
- expo-secure-store para armazenamento seguro de tokens em dispositivos nativos

**Validações:**
- Validação de e-mail institucional (@aluno.ifsp.edu.br ou @ifsp.edu.br)
- Validação de senha (mínimo 8 caracteres)
- Verificação de unicidade de e-mail e nickname no servidor

**Interceptadores:**
- Anexação automática de token nas requisições
- Tratamento automatizado de erros 401/403

---

## 9. Gerenciamento de Estado

**Global:**  
- Zustand para gerenciamento de estado global
- Stores separadas por domínio:
  - userStore: Dados do usuário logado
  - NotifyStore: Gerenciamento de notificações
  - SheetFormStore: Estado do formulário de criação de posts

**Local:**
- useState para gerenciamento de estado de componentes
- useEffect para efeitos colaterais e chamadas à API
- useCallback para otimização de performance

---

## 10. Design e UI/UX

**Paleta de Cores:**
- Primária: #7ec543 (Verde)
- Secundária: #025648 (Verde escuro)
- Background Escuro: #011214
- Vermelho: #6b0000
- Tons de cinza para texto e elementos neutros

**Fontes Personalizadas:**
- Gilroy_Extrabold: Para títulos e destaque
- Gilroy_Light: Para textos regulares

**Componentes Notáveis:**
- Modal para confirmação de ações
- Drawer lateral para navegação
- Bottom Sheet para criação de posts
- Skeleton screens para carregamento
- Cards personalizados para visualização de dados
- Toast messages para feedback

---

**Autor do projeto:** André Luiz.
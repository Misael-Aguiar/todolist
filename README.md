# Todolist — React + Fastify + MySQL

Sistema de lista de tarefas com interface em estilo "glassmorphism" sobre um cenário noturno (busca, filtro, contadores e modais de criação/edição).

## Estrutura

```
todolist/
├── backend/     # API em Fastify + MySQL
└── frontend/    # Interface em React (Vite + CSS puro)
```

## 1. Banco de dados (MySQL)

Crie o banco e a tabela executando o script:

```bash
mysql -u root -p < backend/schema.sql
```

## 2. Backend (Fastify)

```bash
cd backend
# confira o .env com usuário/senha do seu MySQL
npm install
npm run dev
```

A API sobe em `http://localhost:3333`.

### Endpoints

| Método | Rota               | Descrição                                   |
| ------ | ------------------ | ------------------------------------------- |
| GET    | /api/tasks?search=&status=all\|pending\|completed | Lista tarefas + totais (`total`, `completed`) |
| POST   | /api/tasks         | Cria tarefa `{ title, dueDate? }`           |
| PATCH  | /api/tasks/:id     | Atualiza `{ completed?, title?, dueDate? }` |
| DELETE | /api/tasks/:id     | Remove uma tarefa                           |

## 3. Frontend (React + Vite)

```bash
cd frontend
cp .env.example .env   # VITE_API_URL=http://localhost:3333
npm install
npm run dev
```

Acesse `http://localhost:5173` (o backend precisa estar rodando).

```
frontend/src/
├── services/api.js        # chamadas à API
├── hooks/useDebounce.js   # debounce da busca (400ms)
├── components/            # Header, TaskList, TaskItem, TaskModal, EmptyState, FloatingButton
├── App.jsx                # estado e regras (ordenação, atraso)
└── App.css                # estilos
```

## Funcionalidades

- Listagem de tarefas com contadores de total e concluídas
- Busca de tarefas em tempo real (com debounce)
- Criação de tarefas via modal ("Create Task"), com data limite opcional
- Edição de tarefas via modal ("Edit Task") — botão de lápis em cada item
- Marcar/desmarcar tarefa como concluída (checkbox com gradiente)
- Exclusão de tarefas (botões de editar/excluir aparecem ao passar o mouse)
- **Data limite e atraso**: tarefas com data de vencimento no passado e ainda pendentes ficam com o título em vermelho e exibem o selo "Em atraso"
- Ordenação automática: tarefas com data mais próxima aparecem primeiro
- Estado vazio idêntico ao mockup ("You have no pending tasks.")
- Botão flutuante "+" no canto inferior direito

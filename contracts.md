# Contracts - Xhyz Portfolio Backend Integration

## Overview
Implementação de backend completo com painel administrativo para gerenciamento de mapas de Tibia.

---

## 1. Mock Data Atual (Frontend)
**Arquivo**: `/app/frontend/src/data/mockMaps.js`

**Dados mockados**:
- 8 mapas com: id, title, slug, description, tags, size, complexity, thumbnail, images[], author, status, createdAt
- Função `getAllTags()` que retorna todas as tags únicas

**O que será removido após integração**:
- Todo o arquivo `mockMaps.js` será substituído por chamadas de API

---

## 2. Backend Structure

### 2.1 MongoDB Models

**Map Model** (`/app/backend/models/map.py`):
```python
{
  "_id": ObjectId,
  "title": String (required),
  "slug": String (required, unique, indexed),
  "description": String (required),
  "tags": [String],
  "size": String (enum: Minúsculo, Pequeno, Médio, Grande, Enorme, Colossal),
  "complexity": String (enum: Básico, Intermediário, Avançado, Épico),
  "thumbnail": String (URL),
  "images": [String] (URLs),
  "author": String,
  "status": String (enum: available, sold),
  "createdAt": DateTime,
  "updatedAt": DateTime
}
```

**Admin User Model** (`/app/backend/models/admin.py`):
```python
{
  "_id": ObjectId,
  "username": String (required, unique),
  "email": String (required, unique),
  "password": String (hashed, required),
  "createdAt": DateTime
}
```

### 2.2 API Endpoints

**Public Endpoints** (sem autenticação):
- `GET /api/maps` - Listar todos os mapas (com filtros opcionais: tags, search, status)
- `GET /api/maps/:slug` - Obter detalhes de um mapa específico
- `GET /api/tags` - Obter todas as tags únicas

**Admin Endpoints** (requer autenticação):
- `POST /api/auth/login` - Login do admin
- `POST /api/auth/logout` - Logout do admin
- `GET /api/auth/me` - Verificar sessão atual

- `POST /api/admin/maps` - Criar novo mapa
- `PUT /api/admin/maps/:id` - Atualizar mapa existente
- `DELETE /api/admin/maps/:id` - Deletar mapa
- `POST /api/admin/upload` - Upload de imagens

### 2.3 Authentication
- JWT tokens para autenticação
- Middleware para proteger rotas admin
- Sessão armazenada no localStorage do frontend

### 2.4 File Upload
- Upload de imagens usando multipart/form-data
- Armazenamento local em `/app/backend/uploads/`
- URLs servidas como `/api/uploads/:filename`
- Validação: tipos permitidos (jpg, jpeg, png, webp), tamanho máximo 10MB

---

## 3. Frontend Integration

### 3.1 Páginas Públicas (já existem)
**Mantém mock visual enquanto carrega dados reais**:
- `/` - Gallery (GET /api/maps)
- `/map/:slug` - MapDetail (GET /api/maps/:slug)
- `/about` - About (estático)

### 3.2 Novas Páginas Admin
**Rotas a criar**:
- `/admin/login` - Página de login
- `/admin/dashboard` - Dashboard com listagem de mapas
- `/admin/maps/new` - Formulário para criar novo mapa
- `/admin/maps/edit/:id` - Formulário para editar mapa

### 3.3 Context/State Management
**AdminContext** (`/app/frontend/src/context/AdminContext.jsx`):
- Gerenciar estado de autenticação
- Armazenar token JWT
- Funções: login(), logout(), checkAuth()

### 3.4 API Service
**apiService.js** (`/app/frontend/src/services/apiService.js`):
```javascript
// Public APIs
getMaps(filters) -> GET /api/maps
getMapBySlug(slug) -> GET /api/maps/:slug
getTags() -> GET /api/tags

// Admin APIs
login(credentials) -> POST /api/auth/login
createMap(mapData) -> POST /api/admin/maps
updateMap(id, mapData) -> PUT /api/admin/maps/:id
deleteMap(id) -> DELETE /api/admin/maps/:id
uploadImage(file) -> POST /api/admin/upload
```

---

## 4. Implementation Plan

### Phase 1: Backend Setup
1. Criar models (Map, Admin)
2. Criar authentication middleware
3. Implementar endpoints públicos
4. Implementar endpoints admin
5. Configurar upload de arquivos
6. Criar admin user inicial (seed)

### Phase 2: Frontend Admin Panel
1. Criar AdminContext
2. Criar apiService
3. Criar página de Login
4. Criar Dashboard
5. Criar formulário de criar/editar mapa
6. Implementar upload de imagens

### Phase 3: Integration
1. Substituir mockMaps por chamadas de API em Gallery
2. Substituir mockMaps por chamadas de API em MapDetail
3. Adicionar loading states
4. Adicionar error handling
5. Testar fluxo completo

---

## 5. Admin User Credentials (Initial)
```
Username: admin
Email: admin@xhyz.com
Password: Xhyz@2025!
```
(Será criado via script de seed)

---

## 6. Frontend Changes Required

### Gallery.jsx
**Antes**:
```javascript
import { mockMaps, getAllTags } from '../data/mockMaps';
const filteredMaps = mockMaps.filter(...)
```

**Depois**:
```javascript
import { getMaps, getTags } from '../services/apiService';
const [maps, setMaps] = useState([]);
const [tags, setTags] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const mapsData = await getMaps(filters);
    const tagsData = await getTags();
    setMaps(mapsData);
    setTags(tagsData);
  };
  fetchData();
}, [filters]);
```

### MapDetail.jsx
**Antes**:
```javascript
import { mockMaps } from '../data/mockMaps';
const map = mockMaps.find(m => m.slug === slug);
```

**Depois**:
```javascript
import { getMapBySlug } from '../services/apiService';
const [map, setMap] = useState(null);

useEffect(() => {
  const fetchMap = async () => {
    const mapData = await getMapBySlug(slug);
    setMap(mapData);
  };
  fetchMap();
}, [slug]);
```

---

## 7. Security Considerations
- Passwords hashed com bcrypt
- JWT tokens com expiração de 7 dias
- CORS configurado apenas para frontend
- Rate limiting em endpoints de login
- Validação de inputs em todos endpoints
- Sanitização de slugs

---

## 8. Testing Checklist
- [ ] Admin pode fazer login
- [ ] Admin pode criar novo mapa com imagens
- [ ] Admin pode editar mapa existente
- [ ] Admin pode deletar mapa
- [ ] Galeria pública mostra mapas do banco
- [ ] Detalhes do mapa funcionam
- [ ] Upload de múltiplas imagens funciona
- [ ] Filtros e busca funcionam
- [ ] Logout funciona corretamente

function entrar(){
  window.close("index.html");
  window.open("treinos.html");
}

function sair(){
  window.close("treinos.html");
  window.open("index.html");
}


class Modelo {
  constructor(){
    
    this.treinos = JSON.parse(localStorage.getItem('treinoes')) || [];
  }

  
  _commit(treinos) {
    this.onTodoListChanged(treinos); 
    localStorage.setItem('treinoes', JSON.stringify(treinos)); 
  }

  
  addtreino(numTreino, treinontext, repeticoes, carga, link){
    if(this.treinos.length===0) {
      
        const treino = {
          id: numTreino,
          afazeres: [{
              
            id: 1,
            
            exercicio: treinontext,
            
            repeticoes: repeticoes,
            
            carga: carga,
            link: link,
            feito: false
          }]
        }
        
        this.treinos.push(treino);

        
        this._commit(this.treinos);
    } else {
      for(var j=0;j<this.treinos.length;j++){
      
        if(numTreino===this.treinos[j].id){
          this.treinos[j].afazeres.push({
             
            id: this.treinos[j].afazeres[this.treinos[j].afazeres.length - 1].id + 1,
            
            exercicio: treinontext,
            
            repeticoes: repeticoes,
            
            carga: carga,
            link: link,
            feito: false
          });

          this.treinos[j] = {
            id: this.treinos[j].id,
            afazeres: this.treinos[j].afazeres
          }

          
          this._commit(this.treinos);
          break; 
        } else if(j===this.treinos.length-1) {
        
        const treino = {
          id: numTreino,
          afazeres: [{
              
            id: 1,
            
            exercicio: treinontext,
           
            repeticoes: repeticoes,
            
            carga: carga,
            link: link,
            feito: false
          }]
        }
        
        this.treinos.push(treino);

        
        this._commit(this.treinos);
        break;
        }
      } 
    }
    
  }

  
  editarTreino(idTreino, id, exercicio, repeticoes, carga){ 
    
    for(var j=0;j<this.treinos.length;j++){
      if(this.treinos[j].id === idTreino){
        for(var k=0;k<this.treinos[j].afazeres.length;k++){
          if(this.treinos[j].afazeres[k].id === id){
            this.treinos[j].afazeres[k] = {
              
              id: this.treinos[j].afazeres[k].id,
              
              exercicio: exercicio !== ""?exercicio:this.treinos[j].afazeres[k].exercicio,
              
              repeticoes: repeticoes !== ""?repeticoes:this.treinos[j].afazeres[k].repeticoes,
              
              carga: carga !== ""?carga:this.treinos[j].afazeres[k].carga,
              link: this.treinos[j].afazeres[k].link,
              feito: this.treinos[j].afazeres[k].feito
            }
          }
        }
      }
    }

   
    this._commit(this.treinos);
  }

 
  deletartreino(idTreino, id){
    for(var i=0;i<this.treinos.length;i++){
      if(this.treinos[i].id === idTreino){
        this.treinos[i].afazeres = this.treinos[i].afazeres.filter(afazer => afazer.id !== id);
      }
    }
    
    this.treinos = this.treinos.filter(treino => treino.afazeres.length!==0);

    this._commit(this.treinos);
  }

 
  treinoRealizado(idTreino, id){
    for(var j=0;j<this.treinos.length;j++){
      if(this.treinos[j].id === idTreino){
        this.treinos[j].afazeres = this.treinos[j].afazeres.map(afazer =>
          afazer.id === id 
          ? {
              id: afazer.id, 
              exercicio: afazer.exercicio, 
              repeticoes: afazer.repeticoes, 
              carga: afazer.carga,
              link: afazer.link,
              feito: !afazer.feito
            } 
          : afazer
        )
      }
    }
    

    // Atualizamos o valor do armazenamento local e o estado do modelo
    this._commit(this.treinos);
  }

  edNomTreino(idTreino, nomenovo){
    for(var j=0;j<this.treinos.length;j++){
      if(this.treinos[j].id === idTreino){
        this.treinos[j] = {
          id: nomenovo,
          afazeres: this.treinos[j].afazeres
        }
        break;
      }
    }0

    
    this._commit(this.treinos);
  }

  
  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }
}


class Visao {
  
  constructor() {
    
      this.app = $('#root');

      /========================= Campos de texto =========================/

      
      this.entradaTreino = $("<input>");
      
      this.entradaTreino.attr("type","text");

      this.entradaTreino.attr("placeholder","Tipo de Treino");

      this.entradaTreino.attr("name","treino");
      
      this.entradaExercicio = $('<input>');
      
      this.entradaExercicio.attr("type","text");
      
      this.entradaExercicio.attr("placeholder","Nome do Exercicio");
      
      this.entradaExercicio.attr("name","exercicio");
      
      this.entradarepeticoes = $('<input>');
      
      this.entradarepeticoes.attr("type","text");
      
      this.entradarepeticoes.attr("placeholder","Repetições");
      
      this.entradarepeticoes.attr("name","repeticoes");
      
      this.entradaCarga = $('<input>');
     
      this.entradaCarga.attr("type","text");
      
      this.entradaCarga.attr("placeholder","Carga");
      
      this.entradaCarga.attr("name","carga");

      this.entradalink = $('<input>');
      
      this.entradalink.attr("type","text");
      
      this.entradalink.attr("placeholder","Vídeo ou Imagem");
      
      this.entradalink.attr("name",'link');

      /============================= Botões ===========================/

      
      this.botaoAdicionar = $('<button></button>');
      
      this.botaoAdicionar.text('Add');

      /============================= Formulário ===========================/

      
      this.formulario = $('<form></form>');
      
      this.formulario.append(this.entradaTreino, this.entradaExercicio, this.entradarepeticoes, this.entradaCarga, this.entradalink, this.botaoAdicionar);

      /============================= Título ===========================/

     
      this.titulo = $('<h1></h1>');
   
      this.titulo.text('Add Treino');


      /============================= Lista ===========================/

      
      this.todoList = $('<ul>');
      this.todoList.attr("class","todo-list");
      this.app.append(this.titulo, this.formulario, this.todoList);

      
      this._temporaryTodoText1 = '';
      
      this._temporaryTodoText2 = '';
      
      this._temporaryTodoText3 = '';

      this.nomeTemporario = '';
      this._initNomeTemporario();
      
      
      this._initLocalListeners1();
      
      this._initLocalListeners2();
      
      this._initLocalListeners3();

      
      this.tabela = [];
      
    }

  
  get _getExercicio() {
    return this.entradaExercicio.val();
  }
  
  get _getrepeticoes() {
    return this.entradarepeticoes.val();
  }
  
  get _getCarga() {
    return this.entradaCarga.val();
  }
  
  get _getlink() {
    return this.entradalink.val();
  }

  get _getTreino() {
    return this.entradaTreino.val();
  }

  _limparEntrada() {
    this.entradaExercicio.val('');
    this.entradarepeticoes.val('');
    this.entradaCarga.val('');
    this.entradaTreino.val('');
    this.entradalink.val('');
  }

  
  createElement(tag, className) {
    
    const element = document.createElement(tag);

    
    if (className) element.classList.add(className);

    
    return element;
  }

  
  getElement(selector) {
    
    const element = document.querySelector(selector);

    
    return element;
  }

  
  displayTodos(todos) {
   
  $("ul li").remove();

    
    if (todos.length === 0) {
      
      const p = $('<p></p>');
      
      p.textContent = 'Adione um Treino';
      
      this.todoList.append(p);
    } else { 
      for (var i = 0; i < todos.length; i++) {
        this.tabela.push($('<table></table>'));
        this.tabela[i].attr("id", todos[i].id);

        const linhas = $("<tr></tr>");
        this.tabela[i].append(linhas);

        const liTitulo = $('<li></li>');

        liTitulo.attr("class", "conteiner");
        const cb = $('<input>');
        cb.attr("class", "invisivel"); 
        cb.attr("type", 'checkbox');
        cb.attr("checked", false);
        linhas.append(liTitulo);

        const bold1 = $("<b></b>");
        
        const s1 = $('<span>'+todos[i].id+'</span>'); 

        s1.attr("contentEditable", true); 
        s1.attr("class", 'nomeTreinoEditavel'); 
        
        bold1.append(s1);
        bold1.attr("id", todos[i].id); 

        const col0 = $("<td></td>");
        linhas.append(col0);
        
        col0.attr("class", "header");
        col0.attr("id", todos[i].id);

        col0.append(bold1);

        
        liTitulo.append(col0);
        liTitulo.attr("id", todos[i].id);
        

        if(todos[i].afazeres.length>0){
          this.todoList.append(this.tabela[i]);  
        }

        
          const li = $('<li></li>');
          li.attr("id", "conteiner");
          const checkbox = $('<input>');
          checkbox.attr("class", "invisivel"); 
          checkbox.attr("type", 'checkbox');
          checkbox.attr("checked", false);
          linhas.append(li);

          const b1 = $("<b></b>");
          const b2 = $("<b></b>");
          const b3 = $("<b></b>");
          const b4 = $("<b></b>");

          const span1 = $("<span>Exercício</span>");
          const span2 = $("<span>Repetições</span>"); 
          const span3 = $("<span>Carga</span>");  
          const span4 = $("<span>Imagem ou vídeo</span>"); 
          
          b1.append(span1);
          b2.append(span2);
          b3.append(span3);
          b4.append(span4);
          
          const deleteButton = $('<button>Delete</button>');
          deleteButton.attr("class", "invisivel delete");

          const c0 = $("<td></td>");
          const c1 = $("<td></td>");
          const c2 = $("<td></td>");
          const c3 = $("<td></td>");
          const c4 = $("<td></td>");

          linhas.append(c0, c1, c2, c3);

          c0.append(b1);
          c1.append(b2);
          c2.append(b3);
          c3.append(b4);
          c4.append(deleteButton);

          
          li.append(checkbox, c0, c1, c2, c3, c4);

          
          this.todoList.append(this.tabela[i]);
    
        todos[i].afazeres.forEach(todo => { 



          


          const li = $('<li></li>'); 
          li.attr("id", todo.id); 
          const checkbox = $('<input>'); 
          checkbox.attr("type", 'checkbox'); 
          checkbox.attr("checked", todo.feito); 

          linhas.append(li);
          linhas.id = todo.id;
          const span1 = $('<span></span>'); 
          const span2 = $('<span></span>');  
          const span3 = $('<span></span>');  
          const span4 = $('<a></a>');  
          span4.attr("href", todo.link);
          span4.attr("target", "_blank");
          span1.attr("contentEditable", true); 
          span2.attr("contentEditable", true); 
          span3.attr("contentEditable", true);
          span1.attr("class", 'editable1'); 
          span2.attr("class", 'editable2'); 
          span3.attr("class", 'editable3'); 

          if (todo.feito) { 
            const strike1 = $('<strike>'+todo.exercicio+'</strike>'); 
            const strike2 = $('<strike>'+todo.repeticoes+'</strike>'); 
            const strike3 = $('<strike>'+todo.carga+'</strike>'); 
            const strike4 = $('<strike>Ver exemplo</strike>'); 
                           
            span1.append(strike1); 
            span2.append(strike2); 
            span3.append(strike3); 
            span4.append(strike4); 
          } else { 

            span1.append(todo.exercicio); 
            span2.append(todo.repeticoes); 
            span3.append(todo.carga); 
            span4.append("Ver exemplo"); 
          }

          
          const deleteButton = $('<button>Delete</button>');
          deleteButton.attr('class','delete');

          const c0 = $("<td></td>");
          const c1 = $("<td></td>");
          const c2 = $("<td></td>");
          const c3 = $("<td></td>");
          const c4 = $("<td></td>");
          linhas.append(c0, c1, c2, c3, c4);

          c0.append(span1);
          c0.attr("id", todos[i].id+"-"+todo.id);
          c1.append(span2);
          c1.attr("id", todos[i].id+"-"+todo.id);
          c2.append(span3);
          c2.attr("id", todos[i].id+"-"+todo.id);
          c3.append(span4);
          c3.attr("id", todos[i].id+"-"+todo.id);
          c4.append(deleteButton);
          c4.attr("id", todos[i].id+"-"+todo.id);
          

          li.append(checkbox, c0, c1, c2, c3, c4);
          li.attr("id", todos[i].id+"-"+todo.id);

          
          this.todoList.append(this.tabela[i]);
        });

      
    }
  }

  
    console.log(todos)
  }

    _initNomeTemporario() {
    this.todoList.on('input', event => { 
      if (event.target.className === 'nomeTreinoEditavel') { 
        this._initNomeTemporario = event.target.innerText; 
                                
      }
    })
  }

 
  _initLocalListeners1() {
    this.todoList.on('input', event => { 
      if (event.target.className === 'editable1') { 
        this._temporaryTodoText1 = event.target.innerText; 
                                
      }
    })
  }
  
  _initLocalListeners2() {
    this.todoList.on('input', event => { 
      if (event.target.className === 'editable2') { 
        this._temporaryTodoText2 = event.target.innerText; 
                               
      }
    })
  }
 
  _initLocalListeners3() {
    this.todoList.on('input', event => { 
      if (event.target.className === 'editable3') {
        this._temporaryTodoText3 = event.target.innerText; 
                               
      }
    })
  }

  
  bindAddTodo(handler) { 
    this.formulario.submit(event => { 
      event.preventDefault();
      if (this._getTreino, this._getExercicio, this._getrepeticoes, this._getCarga, this._getlink) { 
        handler(this._getTreino, this._getExercicio, this._getrepeticoes, this._getCarga, this._getlink); 
        this._limparEntrada(); 
      }
    })
  }

  
  bindDeleteTodo(handler) { 
    this.todoList.click(event => {
      if (event.target.className === 'delete') { 
        const IDs = event.target.parentElement.id; 
                                
        var idTreino = "";
        var id = "";
        for(var i=0;i<IDs.length;i++){
          if(IDs[i]=='-'){
            for(;i<IDs.length;i++){
              id+=IDs[++i];
            }
            break;
          }
          idTreino+=IDs[i];
        }
        idTreino = idTreino;
        id = parseInt(id);
        handler(idTreino, id); 
      }
    })
  }

 
  bindEditTodo(handler) { 
    this.todoList.focusout(event => { 
      if (this._temporaryTodoText1 || this._temporaryTodoText2 || this._temporaryTodoText3) { 
        const IDs = event.target.parentElement.id; 
                                 
                                
        var idTreino = "";
        var id = "";
        for(var i=0;i<IDs.length;i++){
          if(IDs[i]=='-'){
            for(;i<IDs.length;i++){
              id+=IDs[++i];
            }
            break;
          }
          idTreino+=IDs[i];
        }
        idTreino = idTreino;
        id = parseInt(id);
        handler(idTreino, id, this._temporaryTodoText1, this._temporaryTodoText2, this._temporaryTodoText3); 
                           
        this._temporaryTodoText1 = ''; 
        this._temporaryTodoText2 = ''; 
        this._temporaryTodoText3 = ''; 
      } 
    })
  }

  
  bindEditNomeTodo(handler) { 
    this.todoList.focusout(event => { 
      if (this._initNomeTemporario!=="") { 
        const idTreino = event.target.parentElement.id; 

        handler(idTreino, this._initNomeTemporario); 

        this._initNomeTemporario = '';
      } 
    })
  }

  
  bindToggleTodo(handler) {
    this.todoList.change(event => { 
      if (event.target.type === 'checkbox') { 
        const IDs = event.target.parentElement.id;
                                
        var idTreino = "";
        var id = "";
        for(var i=0;i<IDs.length;i++){
          if(IDs[i]=='-'){
            for(;i<IDs.length;i++){
              id+=IDs[++i];
            }
            break;
          }
          idTreino+=IDs[i];
        }
        idTreino = idTreino;
        id = parseInt(id);
        handler(idTreino, id); 
      }
    })
  }
}

class Controlador {

  
  constructor(modelo, visao){
    this.modelo = modelo;
    this.visao = visao;

    
    this.onTodoListChanged(this.modelo.treinos);

    
    this.visao.bindAddTodo(this.handleAddTodo);
    
    this.visao.bindDeleteTodo(this.handleDeleteTodo);
    
    this.visao.bindToggleTodo(this.handleToggleTodo);
    
    this.visao.bindEditTodo(this.handleEditTodo);
   
    this.visao.bindEditNomeTodo(this.handleEditNomeTodo);

    
    this.modelo.bindTodoListChanged(this.onTodoListChanged);

  }

  
  onTodoListChanged = todos => {
      this.visao.displayTodos(todos);
    }

    
  handleAddTodo = (numTreino, exercicio, repeticoes, carga, link) => {
    this.modelo.addtreino(numTreino, exercicio, repeticoes, carga, link);
  }

  
  handleEditTodo = (idTreino, id, exercicio, repeticoes, carga) => {
    this.modelo.editarTreino(idTreino, id, exercicio, repeticoes, carga);
  }

 
  handleDeleteTodo = (nomeTreino, id) => {
    this.modelo.deletartreino(nomeTreino, id);
  }

 
  handleToggleTodo = (idTreino, id) => {
    this.modelo.treinoRealizado(idTreino, id);
  }

  
  handleEditNomeTodo = (idTreino, nomenovo) => {
    this.modelo.edNomTreino(idTreino, nomenovo);
  }
}

const app = new Controlador(new Modelo, new Visao);

function login(url){
  window.open(url);
}

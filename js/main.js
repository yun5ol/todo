const addTodo = (todoList) => { // 인자로 투두리스트를 받아줍니다.
    if (!document.querySelector(".todo-input").value == ""){ 
        // 만약 투두인풋에 내용이 쓰여있다면
        todoList.appendChild(createTodo(document.querySelector(".todo-input").value)) // 노드 객체만 자식요소로 추가해준다
        // createTodo를 통해 만들어준 노드를 todolist에 바로 넣어버림
        document.querySelector(".todo-input").value = "" // querySelector : () 괄호 안의 첫번째 항목을 반환해준다.
        // 투두 인풋을 초기화해줍니다.

        notCheckCnt();
    }
}

//------------------------------------------------------------------------------

const createTodo = (todo) => {
    let newTodo = document.createElement("div") // div노드 생성
    let todoText = document.createTextNode(todo) // 투두 내용을 넣어줄 text라는 덩어리 생성
    let checkIcon = document.createElement("i") // font awesome icon 생성
    let deleteIcon = document.createElement("i")// font awesome icon 생성

    // 비어있는 노드들에 css와 연동되게끔 class를 넣어줍니다. 생성해준다.
    checkIcon.classList.add("todo-check", "fa-solid", "fa-check")
    deleteIcon.classList.add("todo-delete", "fa-solid", "fa-trash") 
    newTodo.classList.add("todo-card") 

    // check와 delete가 실행되게 노드에 onclick시 실행될 함수를 작성해줍니다.
    // 함수의 인자로는 클릭 된 본인 노드를 보내줍니다.
    checkIcon.onclick = () => checkTodo(checkIcon)
    deleteIcon.onclick = () => deleteTodo(deleteIcon)

    // 새로운 Todo노드를 만들어 리턴해줍니다.
    newTodo.appendChild(checkIcon)
    newTodo.appendChild(deleteIcon)  // 출력되도록
    newTodo.appendChild(todoText)
    return newTodo
}

//-----------------------------------------------------------------------------

/// 전체 체크/해제
const allCheck = () => {
    let todoList = document.querySelectorAll('.todo-card');
    let todoCheckCnt = 0;
    let todoCnt = 0;

    todoCnt = todoList.length;
    todoCheckCnt = Array.from(todoList).filter(m => m.classList.contains('checked')).length;

    //전체 체크된 경우면 한번에 해제
    if(todoCnt !== 0 && todoCheckCnt !== 0 && todoCnt === todoCheckCnt){
        todoList.forEach(function(item){ // 조건 자체가 전체 체크돼있는 상황이니깐
            item.classList.remove("checked"); 
        });
    }
    else{
        todoList.forEach(function(item){
            if(!item.classList.contains('checked')){
                item.classList.add("checked");
            }
        });

       
    }
    notCheckCnt();
}


//-----------------------------------------------------------------------------
//체크 안된것들 갯수를 세는 
const notCheckCnt = () => {
    let todoList = document.querySelectorAll('.todo-card');//elemet들을 리스트형식으로 가져옴
    let count = 0; //체크가안된것들 카운트 변수선언
    let notchecked = document.getElementById("notchecked");//html에서 만든 엘리먼트를 선언
    
    count = todoList.length - Array.from(todoList).filter(m => m.classList.contains('checked')).length;
    // 전체 리스트 - 체크된리스트
    notchecked.innerHTML = `${count} items left`;
    //텍스트 넣어준거 
};

// 이게 체크가 변화할때마다 보여주여되기 때문에 각자 구역에 notCheckCnt함수를 넣어줫다.

//-----------------------------------------------------------------------------


const checkTodo = (elem) => {
    elem.parentNode.classList.toggle("checked")
    //toggle함수를 통해 미리 정의해둔 checked class를 삽입 혹은 삭제해줍니다.
    notCheckCnt();
}

const deleteTodo = (elem) => {
    elem.parentNode.parentNode.removeChild(elem.parentNode) // list에서 card를 지워준다
    // 인자로 받아진 노드의 부모의 부모노드로 거슬러올라가 그곳에서 Todo를 지워줍니다.
    notCheckCnt();
}

//------------------------------------------------------------------------------

const Clear = () => {
    let todoCheckCnt;
    let todo_list = document.getElementsByClassName('todo-list');
    todoCheckCnt = document.getElementsByClassName('checked').length;
    for(var i = 0; i < todoCheckCnt; i++){
        const todo_checked = document.getElementsByClassName('checked')[0];
        todo_list[0].removeChild(todo_checked);
    } //  else 가 없으니깐 for문 회전이 한번에 처리된 것으로 보인다..?

}

//------------------------------------------------------------------------------


window.onload = (() => { 
    // HTML로드 시 자바스크립트 파일이 먼저 실행되는것을 막기 위해 onload로 html요소가 다 불러와졌을 때 실행되게끔 해줍니다.
    let todoList = document.querySelector(".todo-list") // 선택자를 통해 todolist를 선택
    notCheckCnt();
    document.querySelector(".todo-button").onclick = () => {addTodo(todoList)} // onclick -> 누르면 실행되는 함수로 addTodo를 넣어줍니다.

    document.addEventListener("keydown", (e) => {
        if(e.key == "Enter") {
            // 엔터키 입력이 발생하는경우 실행되는 함수
            addTodo(todoList)       
        }
    }) 
    document.querySelector("#todo-allcheck").onclick = () => {allCheck()} // onclick -> 누르면 실행되는 함수로 addTodo를 넣어줍니다.
    document.querySelector('#clear').onclick = () => {Clear()}

})
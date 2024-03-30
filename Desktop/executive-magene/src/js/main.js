function checkSelectAll()  {
  // 전체 체크박스
  const checkboxes 
    = document.querySelectorAll('.checkbox');
  // 선택된 체크박스
  const checked 
    = document.querySelectorAll('.checkbox:checked');
  // select all 체크박스
  const selectAll 
    = document.querySelector('.checkbox__all');
  if(checkboxes.length === checked.length)  {
    selectAll.checked = true;
  }else {
    selectAll.checked = false;
  }
}
function selectAll(selectAll)  {
  const checkboxes 
     = document.getElementsByName('checkbox');
  
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked
  })
}
// 추가 모달창 선택된 파일 미리보기
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('add-data__img').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('add-data__img').src = "";
  }
}

// 변경 모달창 선택된 파일 미리보기
function modireadURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('modi__img').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('modi__img').src = "";
  }
}
createExecutiveData()
function createExecutiveData() {
  const executiveForm = document.querySelector("#executive__form");
  executiveForm.addEventListener("submit", () => {
    // form의 입력값을 변수로 선언
    const inputName = document.getElementById('name').value;
    const inputBirth = document.getElementById('birthday').value;
    const inputGender = document.querySelector('input[name="gender"]:checked').value;
    const inputEmail = document.getElementById('email').value;
    const inputPhoneNum = document.getElementById('phone-num').value;
    const inputDate = document.getElementById('date').value;
    const imgElement = document.getElementById('add-data__img');
    const inputsrc = imgElement.src;
    
    const executive = {
      name: inputName,
      birthday: inputBirth,
      gender: inputGender,
      email: inputEmail,
      phoneNum: inputPhoneNum,
      date: inputDate,
      file: inputsrc,
    }
    // (현재시간 + 난수)의 값을 key로 로컬스토리지 등록
    const objString = JSON.stringify(executive);
    const localkey = (new Date().getTime() + Math.random());
    localStorage.setItem(localkey, objString);
    
    // form 제출 후 리셋
    document.getElementById('executive__form').reset();
    modal.style.display = "none";
  })
} 

// 임직원 엘리멘트 생성
function createExecutiveElement(Executive) {
  // tbody 생성
  const executiveTable = document.querySelector("tbody");

  // tr요소 생성
  const tr = document.createElement("tr");
  tr.className = "row-data";
  executiveTable.append(tr);

  // 체크박스 생성
  const inputTd = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.name = "checkbox";
  checkbox.setAttribute("onclick", "checkSelectAll()");
  inputTd.append(checkbox);

  // img 생성
  const fileTd = document.createElement("td");
  const file = document.createElement("img");
  file.className = "executive__img";

  // 테이블 td요소 생성
  const name = document.createElement("td");
  name.className = "profile__name"
  const birthday = document.createElement("td");
  const gender = document.createElement("td");
  const email = document.createElement("td");
  const phoneNum = document.createElement("td");
  const date = document.createElement("td");

  // 수정 버튼 생성
  const TdModi = document.createElement("td");
  const modibtn = document.createElement("button");
  const modibtnText = document.createTextNode('수정');
  modibtn.type = "button";
  modibtn.className = "executive-modi";
  modibtn.appendChild(modibtnText)
  TdModi.append(modibtn);    
  TdModi.addEventListener("click", modifyExecutiveData);

  // 텍스트 노드 생성
  file.src = Executive.file;
  const nameText = document.createTextNode(Executive.name);
  const birthdayText = document.createTextNode(Executive.birthday);
  const genderText = document.createTextNode(Executive.gender);
  const emailText = document.createTextNode(Executive.email);
  const phoneNumText = document.createTextNode(Executive.phoneNum);
  const dateText = document.createTextNode(Executive.date);

  // 노드 삽입
  fileTd.append(file);
  name.appendChild(nameText);
  birthday.appendChild(birthdayText);
  gender.appendChild(genderText);
  email.appendChild(emailText);
  phoneNum.appendChild(phoneNumText);
  date.appendChild(dateText);

  tr.append(inputTd, fileTd, name, birthday, gender, email,phoneNum, date, TdModi);      
}

// 로컬스토리지에 등록된 모든 key조회
getLocalStorage ()
function getLocalStorage () {
  const localkey = Object.keys(localStorage);
  
  for (let i = 0; i < localkey.length; i++) {
  // key값으로 로컬스토리지 데이터 접근
  const userString = localStorage.getItem(localkey[i]);
  const userObj = JSON.parse(userString);

  const executive = {
    name: userObj.name,
    birthday: userObj.birthday,
    gender: userObj.gender,
    email: userObj.email,
    phoneNum: userObj.phoneNum,
    date: userObj.date,
    file: userObj.file,
  };
  createExecutiveElement(executive);
  };
  deleteExecutivebtn(localkey)  
}
function modifyExecutiveData() {  
  modiModal.style.display = "block";  
  // 로컬 스토리지의 key 순서대로 화면에 출력되기 때문에 
  // 수정버튼을 누른 요소의 부모 요소가 몇 번째 row-data 클래스값인지 반복문을 통해 확인 후 key인덱스 부여
  const all_row = document.querySelectorAll('.row-data')
  for (let i = 0; i < all_row.length; i++) {
    if (all_row[i].textContent == this.closest('.row-data').textContent) {
      const localkey = Object.keys(localStorage);
      const key = localkey[i]

      const userString = localStorage.getItem(key);
      const userObj = JSON.parse(userString);

      const modiFile = document.querySelector(".modi__img");
      modiFile.src = userObj.file
      const modiName = document.querySelector(".modi-data__name");
      modiName.value = userObj.name
      const modiBirthday = document.querySelector(".modi-data__birthday");
      modiBirthday.value = userObj.birthday
      const modiGender = document.querySelector(".modi-data__gender");
      modiGender.checked = userObj.gender
      const modiEmail = document.querySelector(".modi-data__email");
      modiEmail.value = userObj.email
      const modiPhoneNum = document.querySelector(".modi-data__phone-num");
      modiPhoneNum.value = userObj.phoneNum
      const modiDate = document.querySelector(".modi-data__date");
      modiDate.value = userObj.date
      deleteModiExecutive(key)
      updateData(key)
    }
  }
  
}
// 임직원 수정 모달에서 삭제
function deleteModiExecutive(key) {
  const deleteBtn = document.querySelector(".delete__button");

  deleteBtn.addEventListener("click", () => {
    if (confirm("임직원을 삭제 하시겠습니까?")) {
    const localkey = key;
    localStorage.removeItem(localkey);
    location.reload(true);
    alert("데이터를 삭제 했습니다.")
  }
  })
}
// checked 임직원 데이터 삭제
function deleteExecutivebtn(key) {
  const deleteBtn = document.querySelector(".executive-del-btn");
  deleteBtn.addEventListener("click", () => {
    const checkbox = document.querySelectorAll('.checkbox');
    const checkbox__all = document.querySelector('.checkbox__all');
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked && checkbox__all.checked == false) {
        if (confirm("선택한 임직원을 삭제 하시겠습니까?")) {
          const localkey = key[i]
          localStorage.removeItem(localkey);
          location.reload(true)
          alert("데이터를 삭제 했습니다.")
          }
        }
      }
    })
}
// all checked 임직원 데이터 삭제
all_deleteExecutive()
function all_deleteExecutive() {
  const deleteBtn = document.querySelector(".executive-del-btn");
  
  deleteBtn.addEventListener("click", () => {
    const checkbox = document.querySelector('.checkbox__all');
    if (checkbox.checked) {
      if (confirm("전체 직원을 삭제 하시겠습니까?")) {
        const a = Object.keys(localStorage)
        for (let i = 0; i < a.length; i++) {
          // inputName으로 로컬스토리지 데이터 접근
          localStorage.removeItem(a[i]);
          location.reload()
          alert("데이터 전체를 삭제 했습니다.")
        }        
      }
    }
  })
}
// 임직원 데이터 수정
function updateData(key) {
  const updateBtn = document.querySelector(".edit__button");
  updateBtn.addEventListener("click", () => {
    const localkey = key

    const modiName = document.querySelector(".modi-data__name").value;
    const modiBirthday = document.querySelector(".modi-data__birthday").value;
    const modiGender = document.querySelector(".modi-data__gender").value;
    const modiEmail = document.querySelector(".modi-data__email").value;
    const modiPhoneNum = document.querySelector(".modi-data__phone-num").value;
    const modiDate = document.querySelector(".modi-data__date").value;
    const imgElement = document.getElementById('modi__img');
    const inputsrc = imgElement.src;

    const executive = {
      name: modiName,
      birthday: modiBirthday,
      gender: modiGender,
      email: modiEmail,
      phoneNum: modiPhoneNum,
      date: modiDate,
      file: inputsrc,
    };
    const objString = JSON.stringify(executive);
    localStorage.setItem(localkey, objString);
    location.reload(true)
    })
}
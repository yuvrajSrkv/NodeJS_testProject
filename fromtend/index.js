const bookEntryPrint = (data) => {
  const { bookId, bookName, bookEntryTime, bookReturnTime, fine } = data;

  let span = document.createElement("SPAN");
  span.className = "BookArea";
  let p1 = document.createElement("p");
  let text1 = `Book Name : ${bookName}`;
  p1.appendChild(document.createTextNode(text1));
  span.appendChild(p1);

  let p2 = document.createElement("p");
  let text2 = `Book Taken On : ${bookEntryTime}`;
  p2.appendChild(document.createTextNode(text2));
  span.appendChild(p2);

  let p3 = document.createElement("p");
  let text3 = `Book Return Time : ${bookReturnTime}`;
  p3.appendChild(document.createTextNode(text3));
  span.appendChild(p3);

  let p4 = document.createElement("p");
  let text4 = `Fine : ${fine}`;
  p4.appendChild(document.createTextNode(text4));
  span.appendChild(p4);

  let btn = document.createElement("button");
  btn.innerText = "Return";
  btn.type = "button";
  btn.className = "Return";
  btn.id = bookId;

  span.appendChild(btn);

  document.getElementById("bookEntry").appendChild(span);
};

const bookReturnPrint = (data) => {
  const { bookId, bookName, entryTime, returnTime, fine } = data;

  let span = document.createElement("SPAN");
  span.className = "BookArea";
  let p1 = document.createElement("p");
  let text1 = `Book Name : ${bookName}`;
  p1.appendChild(document.createTextNode(text1));
  span.appendChild(p1);

  let p2 = document.createElement("p");
  let text2 = `Book Taken On : ${entryTime}`;
  p2.appendChild(document.createTextNode(text2));
  span.appendChild(p2);

  let p3 = document.createElement("p");
  let text3 = `Book Return Time : ${returnTime}`;
  p3.appendChild(document.createTextNode(text3));
  span.appendChild(p3);

  let p4 = document.createElement("p");
  let text4 = `Fine : ${fine}`;
  p4.appendChild(document.createTextNode(text4));
  span.appendChild(p4);

  document.getElementById("bookReturn").appendChild(span);
};

const bookEntryPost = async (e) => {
  e.preventDefault();
  let bookName = document.getElementById("searchInput").value;
  let obj = {
    bookName: bookName,
  };
  document.getElementById("searchInput").value = " ";
  try {
    const result = await axios.post("http://localhost:8800/bookentry", obj);
    console.log(result.data);
    bookEntryPrint(result.data);
  } catch (err) {
    console.log(err);
  }
};

const reLoad = async () => {
  try {
    const result = await axios.get("http://localhost:8800/bookentry");
    console.log(result.data);
    result.data.forEach((element) => {
      bookEntryPrint(element);
    });

    const result2 = await axios.get("http://localhost:8800/bookReturn");
    console.log(result2.data);
    result2.data.forEach((element) => {
      bookReturnPrint(element);
    });
  } catch (err) {
    console.log(err);
  }
};

const returnItem = async (e) => {
  if (e.target.classList.contains("Return")) {
    let lit = e.target.parentElement;
    let key = e.target.id;

    const obj = {
      bookId: key,
    };
    try {
      const result = await axios.post("http://localhost:8800/bookReturn", obj);
      console.log(result.data);
      bookReturnPrint(result.data);
      document.getElementById("bookEntry").removeChild(lit);
    } catch (err) {
      console.log(err);
    }
  }
};

let form = document.getElementById("myForm");
form.addEventListener("submit", bookEntryPost);

window.addEventListener("DOMContentLoaded", reLoad);

let selectedItem = document.getElementById("bookEntry");
selectedItem.addEventListener("click", returnItem);

class UI {
  constructor() {
    this.profileContainer = document.querySelector('#profileContainer');
    this.alert = document.querySelector('#alert');
    this.selection = document.querySelector('#searchProfile');
  }

  showProfile(profile) {
    this.profileContainer.innerHTML += `
      <div class="card card-body">
  <div class="row">
    <div class="col-md-3">
      <a href="https://placeholder.com"
        ><img src="https://via.placeholder.com/150" class="img-thumbnail"
      /></a>
    </div>
    <div class="col-md-9">
      <h4>Contact</h4>
      <ul class="list-group">
        <li class="list-group-item">Name : ${profile.name}</li>
        <li class="list-group-item">Username : ${profile.username}</li>
        <li class="list-group-item">Email : ${profile.email}</li>
        <li class="list-group-item">
          Adress : ${profile.address.city}, ${profile.address.street},
          ${profile.address.zipcode}, ${profile.address.suite}
        </li>
        <li class="list-group-item">Phone : ${profile.phone}</li>
      </ul>
      <h4 mt-4">TODO </h4>
      <ul id="todo" class="list-group"> </ul>
    </div>
  </div>
</div>

      `;
  }

  showAlert(text) {
    this.alert.innerHTML = `${text} is not Found`;
  }
  clear() {
    this.profileContainer.innerHTML = '';
    this.alert.innerHTML = '';
  }

  showTodo(todo) {
    let html = '';
    todo.forEach((element) => {
      if (element.completed) {
        html += `<li class="list-group-item bg-success">${element.title}</li>`;
      } else {
        html += `<li class="list-group-item bg-secondary">${element.title}</li>`;
      }
    });

    this.profileContainer.querySelector('#todo').innerHTML = html;
  }

  autocomplete(inp, arr) {
    var currentFocus;

    inp.addEventListener('input', function (e) {
      var a,
        b,
        i,
        val = this.value;

      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      a = document.createElement('DIV');
      a.setAttribute('class', ' autocomplete-items');
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement('DIV');
          b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener('click', function (e) {
            inp.value = this.getElementsByTagName('input')[0].value;
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    inp.addEventListener('keydown', function (e) {
      var x = document.getElementById(this.id + 'autocomplete-list');
      if (x) x = x.getElementsByTagName('div');
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;

        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      x[currentFocus].classList.add('autocomplete-active');
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove('autocomplete-active');
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName('autocomplete-items');
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener('click', function (e) {
      closeAllLists(e.target);
    });
  }
}

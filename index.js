let click = false
function myFunction() {
console.log(document.getElementById("nav-content"))
  document.getElementById("nav-content").classList.toggle('show')
}

fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer bdcb0618b2e484173225a32a5593b3f8d21e4ac8`,
  },
  body: JSON.stringify({
    query: `
    {
      user(login: "kehindeBankole") {
        avatarUrl
        bio
        repositories(last: 20) {
          edges {
            node {
              name
              stargazerCount
              updatedAt
              languages(first: 1) {
                edges {
                  node {
                    name
                    color
                  }
                }
              }
              forkCount
              description
            }
          }
          totalCount
        }
        id
        followers(first: 20) {
          edges {
            node {
              id
            }
          }
          totalCount
        }
        name
        login
        following {
          totalCount
        }
        starredRepositories {
          pageInfo {
            endCursor
            startCursor
          }
          totalCount
        }
      }
    }
    
    
         `,
  }),
})
  .then((res) => res.json())
  .then((data) => {
    document.getElementsByTagName("main")[0].style.display = "block";
    document.getElementById("name").textContent = data.data.user.name;
    document.getElementById("loginn").textContent = data.data.user.login;
    document.getElementById("userstatus").textContent = data.data.user.bio;
    document.getElementById("names").textContent = data.data.user.name;
    document.getElementById("logins").textContent = data.data.user.login;
    document.getElementById("userstatus").textContent = data.data.user.bio;
    document.getElementById("userimage").src = data.data.user.avatarUrl;
    document.getElementById("followertext").textContent=`${data.data.user.followers.totalCount} `
    document.getElementById("followingtext").textContent=`${data.data.user.following.totalCount} `
    document.getElementById("stars").textContent=`${data.data.user.starredRepositories.totalCount} `
    document.getElementById(
      "user"
    ).style.backgroundImage = `url(${data.data.user.avatarUrl})`;
    document.getElementById(
      "publicrepos"
    ).textContent = `${data.data.user.repositories.totalCount} results for public repositories`;

    for (let x = 0; x < data.data.user.repositories.edges.length; x++) {
      document.getElementsByClassName("repolist")[0].innerHTML += `
    
      <div
      class="repolist-item"
      style="
        display: grid;
        grid-template-columns: auto 70px;
        padding: 1em 0;
      "
    >
      <div class="item">
        <a href="/">
          <h3 style="font-weight: 500">${
            data.data.user.repositories.edges[x].node.name
          }</h3>
        </a>
        <br/>
        ${
          data.data.user.repositories.edges[x].node.description == null
            ? ""
            : `<small style="color :  #959da5;">${data.data.user.repositories.edges[x].node.description}</small>`
        }
        <div class="info" style="margin-top: 1em; display: flex">
        ${
          data.data.user.repositories.edges[x].node.languages.edges[0] ==
          undefined
            ? ""
            : `<small style="color:#959da5;"><i class="fas fa-circle" style="font-size:10px;color : ${data.data.user.repositories.edges[x].node.languages.edges[0].node.color}"></i>
        ${data.data.user.repositories.edges[x].node.languages.edges[0].node.name}</small>`
        }
          <small style="margin-left: 1em;color:#959da5;"><i class="far fa-star" style="padding-right:3px"></i>${
            data.data.user.repositories.edges[x].node.stargazerCount
          }
          </small>
          <small style="margin-left: 1em;color:#959da5;"><i class="fas fa-code-branch" style="padding-right:3px"></i>${
            data.data.user.repositories.edges[x].node.forkCount
          }</small>
          <small style="margin-left: 1em;color:#959da5;">updated ${ new Date( data.data.user.repositories.edges[x].node.updatedAt).getDate()} days ago</small>
        </div>
      </div>
      <div style="float: right">
        <button
          style="
            background: #f3f4f6;
            border-radius: 5px;
            border: 1px solid rgb(167, 167, 167);
            width: 100%;
            height: 25px;
          "
        >
        <i class="far fa-star"></i> star
        </button>
      </div>
    </div>
    <br />
    <hr style="border: none;
    height: 1px;
    background-color : #eaecef;
 "/>`;
    }
  })
  .catch((err) => {
    document.getElementsByTagName("main")[0].style.display = "none";
  });



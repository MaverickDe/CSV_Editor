import { useEffect, useReducer } from "react";
import img from "./img/R.png";
import store from "./store";
import Sheet from "./sheets"
import { Provider, connect } from "react-redux";
import { api, apidownload } from "./variable";



let histroty = ["inouts, indexofcolumn column", "row   add/remove group of inputs  childindex", "column idofcolumn "]



let horizontal = false;
let vertical = false;







let App = (prop) => {
 

let obj =prop.csv
    useEffect(() => {
        // dispatch([{ type: "csv", csv: obj])
        
          document.querySelector(".sheets").onmouseup = () => {
          
            horizontal = false;
          };
        
          document.querySelector(".sheets").onmousemove = (e) => {
          
            if (horizontal) {
              let { d1, d2, width1, width2 } = horizontal.obj;
        
              let move = e.pageX - horizontal.point;
             
              
              let p =(move +width1)/width1*100
                d1.style.width = `${p}%`;
              
            //   d1.style.width = `${move + width1}px`;
            
              //     if (d2) {
        
              //         Array.from(d2.querySelectorAll("input")).forEach((ed) => {
              //             ed.style.width = `${move - width2}px`;
              //         });
              //     }
            }
          };
},[])


  

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <form
          action={api}
          method="POST"
          encType="multipart/form-data"
          className="form1"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "40",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "300px",
              height: "400px",
              boxShadow: "0px 10px 20px -10px black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input onChange={(e) => {
            let  target = e.currentTarget

               const maxAllowedSize = 5 * 1024 * 1024;
              if (target.files[0].size > maxAllowedSize) {
                target.value = "";
                alert("file to large")
                 // Here you can ask your users to load correct file
               }
              
            }} accept=".csv" type="file" name="csv" />
            {/* <input
              onChange={() => {}}
              type="name"
              name="name"
              value={`name${Math.random()}`}
              hidden="hidden"
            /> */}
            <button
              onClick={(e) => {
                e.preventDefault();

                let obj_ = (objj) => {
                  return {
                    id: Math.random(),
                    history: [],
                    currenthistory: 1,

                    ...(() => {
                      let obj = Object.keys(objj).reduce(
                        (total, acc) => {
                          let obj = {
                            id: Math.random(),
                            head: acc,
                            list: [
                              ...Object.values(objj[acc]).map((e) => ({
                                id: Math.random(),
                                value: e || "",
                              })),
                            ],
                          };

                          total.obj.push(obj);

                        
                          if (!total.maxlist) {
                            total.maxlist = obj;
                          } else if (
                            total.maxlist.list.length < obj.list.length
                          ) {
                            total.maxlist = obj;
                          }
                          return total;
                        },
                        { obj: [], maxlist: undefined }
                      );

                      obj.obj = obj.obj.map((e) => {
                        let v = e;
                        v.list.concat(
                          obj.maxlist.list
                            .slice(e.list.length)
                            .map((e) => ({ id: Math.random(), value: "" }))
                        );
                        return v;
                      });

                      return obj;
                    })(),
                    // maxlist: this
                  };
                };

                let form = document.querySelector(".form1");
                let oData = new FormData(form);
               
                document.querySelector(".loadercon").style.display = "flex";
                const oReq = new XMLHttpRequest();
                oReq.open("POST", api, true);
                //  oReq.withCredentials = true;
                oReq.onload = function (oEvent) {
                  if (oReq.status === 200) {
                   console.log(oReq.response.replaceAll(NaN,`""`))
                    let data = obj_(JSON.parse(oReq.response.replaceAll(NaN,`""`)));
                    if (data) {
                     
                      prop.dispatch([{ type: "csv", csv: data }]);
                    }
                    //  navigate("/auth/dashboard");
                  } else {
                    document.querySelector(".loadercon").style.display = "none";
                  }
                };
                document.querySelector(".form1").style.display = "none";
                document.querySelector(".loadercon").style.display = "flex";
                oReq.send(oData);

              }}
              type="submit"
              style={{
                borderRadius: "5px",
                marginTop: "20px",
                backgroundColor: "blue",
              }}
            >
              submit
            </button>

            <div
              onClick={() => {
                document.querySelector(".form1").style.display = "none";
              }}
              style={{ cursor: "pointer" }}
            >
              cancel
            </div>
          </div>
        </form>
        <h2
          style={{
            margin: "10px",
          }}
        >
          CSV EDITOR
        </h2>
        <header
          style={{
            backgroundColor: "black",
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",

            padding: "0px 10px",
          }}
        >
          <ul style={{ listStyle: "none", display: "flex" }}>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                height: "30px",
                padding: "3px 10px",

                color: "white",
                backgroundColor: "blue",
                borderRadius: "5px",
              }}
              onClick={() => {
                document.querySelector(".form1").style.display = "flex";
              }}
            >
              upload
            </li>
          </ul>
        </header>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            boxShadow: "0px 10px 20px -10px black",
            zIndex: "100",
            position: "relative",
          }}
          className="addsheet"
        >
          <button
            onClick={() => {
              document.querySelector(".form1").style.display = "flex";
            }}
          >
           +
          </button>
          <div
            style={{
              position: "relative",
              display: "flex",
              height: "100%",
              alignItems: "center",
              backgroundColor: "grey",
              marginBottom: "1px",
            }}
            className="sheetbtn"
          >
            {obj.map((e, index, arr) => {
            

              let id = e.id;

              return (
                <div key={`workbook${id}`}>
                  <div
                    className="workbook"
                    id={`workbook${id}`}
                    style={{ margin: "5px 01px 0px 5px " }}
                    onClick={() => {
                      Array.from(
                        document.querySelectorAll(".workbook")
                      ).forEach((e, index) => {
                        e.classList.remove("workbookactive");
                      });
                      prop.dispatch([{ type: "active", id }]);
                      document
                        .getElementById(`workbook${id}`)
                        .classList.add("workbookactive");
                    }}
                  >
                    {` sheet ${index + 1}`}
                  </div>
                  {prop.active == id && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "0px",
                        height: "100%",
                        backgroundColor: "white",
                        // width:"fit-content",
                        minWidth: "100%",
                        boxShadow: "0px 10px 20px -10px black",
                        display: "flex",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <button
                          style={{
                            marginRight: "5px",
                            backgroundColor: "white",
                            color: "black",
                            width: "30px",
                          }}
                          onClick={() => {
                            prop.dispatch([{ type: "history", value: -1 }]);
                          }}
                        >
                          <i class="fa-solid fa-rotate-left"></i>
                        </button>
                        <button
                          style={{
                            marginRight: "5px",
                            backgroundColor: "white",
                            color: "black",
                            width: "30px",
                          }}
                          onClick={() => {
                            prop.dispatch([{ type: "history", value: 1 }]);
                          }}
                        >
                          <i class="fa-sharp fa-solid fa-rotate-right"></i>
                        </button>
                      </div>
                      <button>
                        <select
                          name="d"
                          labels="F"
                          onChange={(e) => {
                            let value = JSON.parse(e.currentTarget.value);
                            if (value) {
                              prop.dispatch([{ type: "merge", ...value }]);
                            }
                          }}
                        >
                          <option hidden diabled="true">
                            merge
                          </option>
                          <optgroup label="merge with row">
                            {arr.map((e, index) => {
                              return (
                                <option
                                  name="ss"
                                  key={e.id}
                                  value={JSON.stringify({
                                    id: e.id,
                                    direction: "row",
                                  })}
                                >{`sheet ${index + 1}`}</option>
                              );
                            })}
                            {/* <option value="sheet">sheet1</option> */}
                          </optgroup>
                          <optgroup label="merge with column">
                            {arr.map((e, index) => {
                              return (
                                <option
                                  name="ss"
                                  key={e.id}
                                  value={JSON.stringify({
                                    id: e.id,
                                    direction: "column",
                                  })}
                                >{`sheet ${index + 1}`}</option>
                              );
                            })}
                          </optgroup>
                        </select>
                      </button>
                      <button
                        style={{
                          marginRight: "5px",
                          backgroundColor: "white",
                          color: "black",
                        }}
                      >
                        <i class="fa-solid fa-folder-arrow-down"></i>
                      </button>
                      <button
                        style={{
                          marginRight: "5px",
                          backgroundColor: "white",
                          color: "black",
                        }}
                        onClick={() => {
                          prop.dispatch([{ type: "delete" }]);
                        }}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                      <button
                        style={{
                          marginRight: "5px",
                          backgroundColor: "white",
                          color: "black",
                        }}
                        onClick={async () => {

                          
                          let parentindex = prop.csv.findIndex(c => c.id == prop.active)
                          console.log(prop,parentindex)

                          let post = {}
                            let list=[];
                          // let par =

                          prop.csv[parentindex].obj.forEach(e => {
                            console.log(e)
                            if (e.head) {
                              if (!post.head) {
                                post.head=[]
                               }
                              
                              post.head.push(e.head)
                                let obj = {};
                                obj[e.head] = e.list;
                              list.push(obj);
                              
                            }



                            // while (true) {
                            //   if (!post.body) {
                            //     post.body = [];
                            //   }



                                
                            //   }
                            
                            
                          })
                       
                          
                          console.log(list, prop.csv[parentindex].maxlist.list);
                           let list2 = prop.csv[parentindex].maxlist.list.slice(0,1000).map(
                             (e, index) => {
                               
                               return list.reduce((total, acc) => {
                                 let key = Object.keys(acc)[0]
                                //  console.log(key,total)
                                 total[key] = acc[key][index].value
                                 return total
                               },{})
                               
                             }
                           );
                         
                          console.log(list2)
                         post.body=list2

                          console.log(post)

                          

                          let dep = await fetch(apidownload, {
                            mode: "cors",
                            method: "post",
                            headers: {
                              "Content-Type": "application/json",
                              // 'Content-Type': 'application/x-www-form-urlencoded',
                            },

                            body: JSON.stringify(post),
                            mode: "cors",
                          });
                          dep.blob().then((blob) => {
          console.log(blob)
           
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                a.download ="filename.csv";
             
                a.click();
                a.remove();
        })
    
    












                          // prop.dispatch([{ type: "delete" }]);
                        }}
                      >
                        <i class="fa-solid fa-download"></i>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="sheets"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: "calc(100% - 100px)",
            marginTop: "30px",
            overflow: "scroll",
            padding: "10px",
            position: "relative",
          }}
        >
          <center
            style={{
              width: "100%",
              position: "absolute",
              height: "100%",
              alignItems: "center",
              backgroundColor: "white",
              // display: "flex",
              justifyContent: "center",
              zIndex: "400",
            }}
            className="loadercon"
          >
            <div className="loader">
              <div className="bar"></div>
            </div>
          </center>
          {(prop.active && <Sheet {...{ id: `child${prop.active}` }} />) || (
            <center
              style={{
                width: "100%",
                position: "absolute",
                height: "100%",
                alignItems: "center",
                // backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                // display: "none",
              }}
            >
              <img src={img}></img>
            </center>
          )}
        </div>
      </div>
    );
}


export default connect((state) => ({ active:state.active,csv:state.csv }),
    (dispatch) => ({ dispatch: (obj) => { dispatch({type:"act",act: obj })}}))(App);
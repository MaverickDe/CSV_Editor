
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
let timeout1;
let timeout2;
let scroll;
let viewnumber = 1000


let horizontal = false;
let vertical = false;

let Sheet = (prop) => {
  let [slice,setslice] = useState([0,viewnumber])


  let dispatch = (obj) => {

    prop.dispatch(prop.active,obj)
    

  }

    
  useEffect(() => {
            document.querySelector(".loadercon").style.display = "none";
    
        document.getElementById(prop.id).onmouseup = () => {
         
          horizontal = false;
          vertical =false
        };
       document.getElementById(prop.id).onmousemove = (e) => {
       
         if (horizontal) {
           let { d1, d2, width1, width2 } = horizontal.obj;
      
           let move = e.pageX - horizontal.point;
          
           Array.from(d1.querySelectorAll("input")).forEach((ed) => {
             ed.style.width = `${move + width1}px`;
           });
      
           //     if (d2) {
      
           //         Array.from(d2.querySelectorAll("input")).forEach((ed) => {
           //             ed.style.width = `${move - width2}px`;
           //         });
           //     }
         }

        
         if (vertical) {
         
            let move2 = e.pageY- vertical.point;
           let list = document.querySelectorAll(".list");
          
           Array.from(list).forEach((e) => {
             let children = e.children;
           
             let child = Array.from(children)[vertical.index];
             if (child) {
             
               
                child.style.height = `${move2 + vertical.obj.height1}px`;
               
             }
           });

           let move = e.offsetX - horizontal;

           // d2.width = `${d1.offsetWidth - move}px`;
         }
       };
  }, [slice,prop])
  
  
  // return <div style={{ width: "1000px", height: "1000px", backgroundColor: "blue" }} onClick={()=> {
  
    
  // dispatch([{ type: "namej",value:Math.random() }]);
  // }}>
     
    
  // </div>
  

  return (
    <div
      
      onScroll={(e) => {

        clearTimeout(timeout1)
        clearTimeout(timeout2)
        
         document.querySelector(".loadercon").style.display = "none";
        let height = e.nativeEvent.scrollHeight;
        let scrollheight =
          e.currentTarget.scrollHeight - e.currentTarget.clientHeight;
        let offsetheight = e.currentTarget.offsetHeight;
        let scrollTop = e.nativeEvent.currentTarget.scrollTop;

      
      let trgt =e.currentTarget
      let slice_ =[]
    
        if (scrollTop == scrollheight && prop.csv.maxlist.list[slice[0] + viewnumber] &&!scroll) {
             slice_[0] = slice[0] + viewnumber;
          slice_[1] = slice[1] + viewnumber;
          
        
          document.querySelector(".loadercon").style.display = "flex";
          
          scroll = true
          timeout1 = setTimeout(() => {
            trgt.scrollTop = 0;
            
            setslice(slice_)
          },2000)
        } else if (scrollTop == 0 && prop.csv.maxlist.list[slice[0] - viewnumber] && !scroll) {
          slice_[0] = slice[0] - viewnumber;
          slice_[1] = slice[1] - viewnumber;

   
          document.querySelector(".loadercon").style.display = "flex";
          scroll = true
          timeout2 = setTimeout(() => {
           trgt.scrollTop = scrollheight;
           setslice(slice_);
         }, 2000);
        }

        else {
         scroll=undefined

        }
      
        
       

          }}
         id={prop.id}
      style={{
        padding: "10px",
      paddingLeft:"50px",
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        overflow: "scroll",
        position:"relative"
      }}
    >

     
      {/* <div key={e.id} id={e.id} style={{ display: "flex", height: "fit-content" }}></div> */}
      <div
        style={{ display: "flex", margin: "100px", width: "fit-content",  boxSizing: "border-box", }}
      >
{prop.csv.obj.map((e, index) => {
                let head = e.head
            let parent = e.id;
            let index_  = index

  let parentobj=(trgt)=>({
                                  type: "head",
                                  column: head,
                                  columnid: parent,
                                  columnindex: index_,
                                  value:trgt && trgt.currentTarget.value||"",
                                })
          return (
            <div
              key={parent}
              id={parent}
              style={{ display: "flex", height: "fit-content" }}
            >
              <div
                style={{
                  position: "relative",
                }}
              >
                <input
                  style={{
                    width: "100px",
                    height: "20px",
                    textAlign: "center",
                    border: "1px solid black",
                    display: "block",
                    fontWeight: "bolder",
                    // position:"fixed"
                  }}
                  value={head}
                  key={parent}
                  onChange={(trgt) => {
                    dispatch([parentobj(trgt)]);
                  }}
                />
                <div
                  className="columntoolbar"
                  style={{ position: "absolute", top: "-20px" }}
                >
                  {"..."}
                  <div className="columntoolbardiv">
                    <button
                      onClick={() => {
                        dispatch([
                          { ...parentobj(), type: "addcolumn", dir: 0 },
                        ]);
                      }}
                    >
                      <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <button
                      onClick={() => {
                        dispatch([
                          { ...parentobj(), type: "addcolumn", dir: 1 },
                        ]);
                      }}
                    >
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                    <button
                      onClick={() => {
                        dispatch([{ ...parentobj(), type: "deletecolumn" }]);
                      }}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
                <hr
                  style={{
                    backgroundColor: "blue",
                  }}
                />
                <div className="list">
                  {e.list.slice(...slice).map((ee, index) => {
                    let index__ = index + slice[0];
                    let rowobj = (trgt) => ({
                      rowid: ee.id,
                      rowindex: index__,

                      value: (trgt && trgt.currentTarget.value) || "",
                    });
                   
                    return (
                      <div
                        className="input"
                        key={ee.id}
                        style={{ position: "relative" }}
                      >
                        {index_ == 0 && (
                          <div
                            style={{
                              right: "100%",
                              // backgroundColor:"black",
                              position: "absolute",
                              width: "fit-content",
                              zIndex: "30",
                              // marginRight: "1000px",
                              display: "flex",
                            }}
                            className="rowtoolbar"
                          >
                            {" "}
                            <div>{index__}</div>
                            <div> {":"}</div>
                            <div style={{}} className="rowtoolbardiv">
                              <div>
                                <button
                                  onClick={() => {
                                    dispatch([
                                      {
                                        ...parentobj(),
                                        ...rowobj(),
                                        type: "deleterow",
                                      },
                                    ]);
                                  }}
                                >
                                  <i class="fa-solid fa-trash"></i>
                                </button>
                              </div>
                              <div>
                                <button
                                  onClick={() => {
                                    dispatch([
                                      {
                                        ...parentobj(),
                                        ...rowobj(),
                                        type: "addrow",
                                        dir: 0,
                                      },
                                    ]);
                                  }}
                                >
                                  <i class="fa-solid fa-arrow-turn-up"></i>
                                </button>
                              </div>
                              <div>
                                <button
                                  onClick={() => {
                                    dispatch([
                                      {
                                        ...parentobj(),
                                        ...rowobj(),
                                        type: "addrow",
                                        dir: 1,
                                      },
                                    ]);
                                  }}
                                >
                                  <i class="fa-solid fa-arrow-turn-down"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="inputool">
                          ...
                          <div className="inputtoolbar">
                            <button
                              onClick={() => {
                                dispatch([
                                  {
                                    ...rowobj(),
                                    ...parentobj(),
                                    type: "deleteinput",
                                  },
                                ]);
                              }}
                              className="deleteinput"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                            <button
                              onClick={() => {
                                dispatch([
                                  {
                                    ...parentobj(),
                                    ...rowobj(),
                                    type: "addinput",
                                    dir: 0,
                                  },
                                ]);
                              }}
                              className="addinputbelow"
                            >
                              <i class="fa-solid fa-arrow-turn-up"></i>
                            </button>
                            <button
                              onClick={() => {
                                dispatch([
                                  {
                                    ...parentobj(),
                                    ...rowobj(),
                                    type: "addinput",
                                    dir: 1,
                                  },
                                ]);
                              }}
                              className="addinputup"
                            >
                              <i class="fa-solid fa-arrow-turn-down"></i>
                            </button>
                          </div>
                        </div>

                        <input
                          style={{
                            width: "100px",
                            height: "20px",
                            textAlign: "center",
                            border: "1px solid black",
                            display: "block",
                          }}
                          key={ee.id}
                          id={ee.id}
                          onChange={(trgt) => {
                            dispatch([
                              {
                                ...parentobj(trgt),
                                type: "input",
                                rowindex: index__,
                                rowid: ee.id,
                              },
                            ]);
                          }}
                          value={ee.value}
                        />

                        <hr
                          style={{ cursor: "ns-resize" }}
                          onMouseDown={(e) => {
                          
                            let obj = {};
                            let d1 = document.getElementById(rowobj().rowid);

                            obj.height1 = d1.offsetHeight;
                            obj.d1 = d1;

                            vertical = {
                              point: e.nativeEvent.pageY,
                              id: parent,
                              obj,
                              index: index,
                            };
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr
                className="horizontal"
                onMouseDown={(e) => {
                
                  let obj = {};
                  let d1 = document.getElementById(parent);
                  let d2 = d1.nextElementSibling;

                  obj.width1 = d1.offsetWidth;
                  obj.d1 = d1;
                  if (d2) {
                    obj.width2 = d2.offsetWidth;
                    obj.d2 = d2;
                  }

                  horizontal = {
                    point: e.nativeEvent.pageX,
                    id: parent,
                    obj,
                  };

                 
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );


};





export default connect((state) => {  return { ...state, csv: state.csv.find((e) => e.id == state.active) };},
    (dispatch) => ({ dispatch: (id,obj) => { dispatch({ type: "act",parentid:id, act:[{type:"rerender",value:Math.random()} ,...obj,] })}}))(Sheet);

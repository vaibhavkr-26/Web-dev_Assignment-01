const form = document.getElementById("event_form")
const title_input = document.getElementById("event_title")
const date_input = document.getElementById("event_date")
const cat_input = document.getElementById("event_category")
const desc_input = document.getElementById("event_desc")
const clear_btn = document.getElementById("clearAllBtn")
const sample_btn = document.getElementById("addSampleBtn")
const list = document.getElementById("event_cards")
const demo = document.querySelector(".dom_demo")
const storage_key = "event_dashboard_cards_1"

const sample_list = [
  { title: "Web Development Conference", date: "2026-02-15", category: "Conference", description: "Annual conference on modern web technologies." },
  { title: "JavaScript Workshop", date: "2026-02-20", category: "Workshop", description: "Hands-on JavaScript learning session." }
]

function card_html(d){
  return '<article class="cards" data-id="' + d.id + '">' +
    '<button class="delete_btn">&times;</button>' +
    '<h3 class="event_title">' + d.title + '</h3>' +
    '<p class="event_date">🗓️ ' + d.date + '</p>' +
    '<span class="event_badge">' + d.category + '</span>' +
    '<p class="event_desc">' + d.description + '</p>' +
    '</article>'
}

function empty_block(){
  list.innerHTML = '<div class="empty_state">No events yet. Add your first event!</div>'
}

function sample_btn_state(){
  const has_card = list.querySelector(".cards")
  if(has_card){ sample_btn.style.display = "none" }
  else { sample_btn.style.display = "" }
}

function get_saved(){
  const raw_data = localStorage.getItem(storage_key)
  if(!raw_data) return []
  try {
    return JSON.parse(raw_data)
  } catch(err){
    return []
  }
}

function save_all(arr){
  localStorage.setItem(storage_key, JSON.stringify(arr))
}

function render_all(arr){
  if(!arr.length){
    empty_block()
    sample_btn_state()
    return
  }

  list.innerHTML = ""
  for(let i=0;i<arr.length;i++){
    list.insertAdjacentHTML("beforeend", card_html(arr[i]))
  }
  sample_btn_state()
}

form.addEventListener("submit", function(e){
  e.preventDefault()

  const t_val = title_input.value.trim()
  const dt_val = date_input.value
  const c_val = cat_input.value
  const ds_val = desc_input.value.trim()

  if(!t_val || !dt_val || !ds_val) return

  const item_data = {
    id: Date.now().toString(),
    title: t_val,
    date: dt_val,
    category: c_val,
    description: ds_val
  }

  const all_items = get_saved()
  all_items.push(item_data)
  save_all(all_items)
  render_all(all_items)

  form.reset()
})

clear_btn.addEventListener("click", function(){
  localStorage.removeItem(storage_key)
  render_all([])
})

sample_btn.addEventListener("click", function(){
  const all_items = []
  for(let i=0;i<sample_list.length;i++){
    all_items.push({
      id: (Date.now() + i).toString(),
      title: sample_list[i].title,
      date: sample_list[i].date,
      category: sample_list[i].category,
      description: sample_list[i].description
    })
  }
  save_all(all_items)
  render_all(all_items)
})

list.addEventListener("click", function(e){
  if(!e.target.classList.contains("delete_btn")) return
  const card_box = e.target.closest(".cards")
  if(!card_box) return

  const card_id = card_box.getAttribute("data-id")
  const all_items = get_saved().filter(function(x){ return x.id !== card_id })
  save_all(all_items)
  render_all(all_items)
})

document.addEventListener("keydown", function(e){
  demo.innerHTML = '<span class="key_label">You Pressed:</span> ' + e.key
})

render_all(get_saved())

// const UNSTARTED = "unstarted"
// const STARTED = "started"
// const CLOSED = "closed"
// const ARCHIVE = "archived"
// const FAVORITE = "favorite"

export const status = {
  UNSTARTED: "unstarted",
  STARTED: "started",
  CLOSED: "closed",
  ARCHIVE: "archived",
  FAVORITE: "favorite"
}

const attrs = {
  'colors': { 
    'unstarted': 'blue', 
    'started': 'green', 
    'closed': 'red', 
    'requeue': 'red', 
    'archive': 'grey'
  },
  'icons': { 
    'unstarted': 'mdi-arrow-right-circle-outline', 
    'started': 'mdi-check', 
    'closed': 'mdi-restart', 
    'requeue': 'mdi-restart', 
    'archive': 'mdi-archive-outline'
  },
  'tooltips': { 
    'unstarted': 'Start', 
    'started': 'Complete', 
    'closed': 'Move back to Complete', 
    'requeue': 'Move back to Up Next', 
    'archive': 'Archive'
  }
}

// export const COLORS: attrs.colors

export default Object.freeze({
  COLORS: attrs.colors,
  ICONS: attrs.icons,
  TOOLTIPS: attrs.tooltips
})
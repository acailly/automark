
export default (code) => {
  const script = '(function(){' + code + '})()'
  return 'javascript:' + encodeURIComponent(script)
}

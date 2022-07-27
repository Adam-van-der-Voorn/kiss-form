/*

design

submitting:
input state:
errors:
touched:
dirty:

pass down a single const object that never chnages on rerender
onbject contains a function control(inputName):
    getState
    setState
    getError
    getTouched
    getDirty
object contains a function arrayControl(inputName):
    getState
    setState
    ...
    push, insert, etc..
contains a function register(inputName)
    which returns {
        value: getState(inputName)
        onChange: setState(inputName)
        onBlur: set the error (configurable?)
        onWhenever: set the touched, dirty

or..
useForm(initailData, Config, validation) is the top level and returs all those function and the form object
useFormPartition takes the form object and a substring, as well as form object.
this formPartition object can be passed into another useFormPartiton as the "form"
useFormPartition returns the same state functions, and changing state via this partition should not affect other partitions (or the root? idk)
the form/formPartition object can be passed into a useFormArray which gives the array fucntions and id's
 */
({
	doInit : function(component, event, helper) {
       // component.set("v.var1","Value update from component to controller")
      
        var data={'name':'test name',
                  'email':'test@test.com'};
        
        component.set("v.jsobj",data)
	}
})
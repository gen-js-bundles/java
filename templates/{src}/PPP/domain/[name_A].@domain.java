package <%=gen.package%>;

import java.io.Serializable;

<% each(entity.fields, function(field) { %>
<%   if(field.type == 'Date') { %>
import java.util.Date;
<%   } %>
<% }) %>
<% each(entity.links, function(link, linkName) { %>
<%   if(link.type == 'many-to-many' || link.type == 'one-to-many') { %>
import java.util.List;
import java.util.ArrayList;
<%   } %>
<% }) %>
<%
each(entity.links, function(link, linkName) {
  var genTarget = getGen('[name_A].java', link.target);
%>
import <%= genTarget.import %>;
<%
})
%>

public class <%=gen.name%> implements Serializable {

  <%each(entity.fields, function(field) {%>

    private <%=field.type.A()%> <%=field.name.a()%>;
  <%})%>
<%
each(entity.links, function(link, linkName) {
  if(link.type == 'many-to-one' || link.type == 'one-to-one') {
 %>

    private <%=link.target.A()%> <%=linkName.a()%>;
 <%
  } else {
 %>

    private List<<%=link.target.A()%>> <%=linkName.a()%> = new ArrayList<<%=link.target.A()%>>();
 <%
  }
})
%>

  <%each(entity.fields, function(field) {%>

    public <%=gen.name%> set<%=field.name.A()%>(<%=field.type.A()%> <%=field.name.a()%>) {
    	this.<%=field.name.a()%> = <%=field.name.a()%>;
    	return this;
    }

    public <%=field.type.A()%> get<%=field.name.A()%>() {
    	return this.<%=field.name.a()%>;
    }
  <%})%>
<%
each(entity.links, function(link, linkName) {
  if(link.type == 'many-to-one' || link.type == 'many-to-many') {
 %>

    public void set<%=linkName.A()%>(<%=link.target.A()%> <%=linkName.a()%>) {
        this.<%=linkName.a()%> = <%=linkName.a()%>;
    }

    public <%=link.target.A()%> get<%=linkName.A()%>() {
        return <%=linkName.a()%>;
    }
 <%
  } else {
 %>

    public void set<%=linkName.A()%>(List<<%=link.target.A()%>> <%=linkName.a()%>) {
        this.<%=linkName.a()%> = <%=linkName.a()%>;
    }

    public List<<%=link.target.A()%>> get<%=linkName.A()%>() {
        return <%=linkName.a()%>;
    }
 <%
  }
})
%>

}
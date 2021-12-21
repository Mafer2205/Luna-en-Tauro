use salon; 

insert into empleados (Nomb_emp,App_emp,Tel_emp,Correo_emp,Contrasena,Fecha_ing,Estatus ) values ("Diana","Mendez Gonzalez","2299113344","di_mego@gmail.com",'Diana','2021-11-16',"Activo");
insert into empleados (Nomb_emp,App_emp,Tel_emp,Correo_emp,Contrasena,Fecha_ing,Estatus ) values ("Natali","Vazquez Perez","2291457887","nats_perez@hotmail.com",'Natali','2021-11-16',"Activo");
insert into empleados (Nomb_emp,App_emp,Tel_emp,Correo_emp,Contrasena,Fecha_ing,Estatus )  values ("Fernanda","Garcia Gordillo","2292966998","mafer_22@gmail.com",'Fernanda','2021-11-17',"Activo");
insert into empleados (Nomb_emp,App_emp,Tel_emp,Correo_emp,Contrasena,Fecha_ing,Estatus )  values ("Sofia","Gomez Lopez","2294563289","sof_logo@hotmail.com",'Sofia','2021-11-17',"Activo");

insert into promociones (Nomb_promo,Descrip_promo,Fecha_promo,Descuento) values ("Normal","No se aplica ningun descuento", curdate(), 0.0);
insert into promociones (Nomb_promo,Descrip_promo,Fecha_promo,Descuento) values ("2X1 en todo","Se aplicara 2x1 en todos los servicios, llegando dos personas solo paga lo de una",'2021-11-20', .50);
insert into promociones (Nomb_promo,Descrip_promo,Fecha_promo,Descuento) values ("10% de descuento en tu cabello","10% de descuento en tratamiento de restauracion de botox en el cabello", '2021-11-30', .10);
insert into promociones (Nomb_promo,Descrip_promo,Fecha_promo,Descuento) values ("25% de descuento en uñas","25% de descuento en uñas postizas", '2021-12-10', .25);
insert into promociones (Nomb_promo,Descrip_promo,Fecha_promo,Descuento) values ("2x1 en cortes","2x1 en corte de hombre y mujer, asistan dos personas y solo paga el de uno", '2021-12-20', .50);

insert into servicios (Nomb_serv,Descrip_serv,Costo_serv) values ("Uñas postizas", "Colocacion de uñas de la mano postizas y manicure con dos tonos de su eleccion", 150.0);
insert into servicios (Nomb_serv,Descrip_serv,Costo_serv) values ("Uñas ampliadas", "Colocacion de uñas de la mano ampliadas y manicure con dos tonos de su eleccion", 150.0);
insert into servicios (Nomb_serv,Descrip_serv,Costo_serv) values ("Uñas con gelish", "Uñas de la mano con gelish y manicure con dos tonos de su eleccion", 100.0);
insert into servicios (Nomb_serv,Descrip_serv,Costo_serv) values ("Uñas del pie con gelish", "Uñas del pie con gelish y pedicure con dos tonos de su eleccion", 100.0);
insert into servicios (Nomb_serv,Descrip_serv,Costo_serv) values ("Pedicure", "Pedicure con tono normal en uña", 60.0);
insert into servicios (Nomb_serv,Descrip_serv,Costo_serv) values ("Manicure", "Manicure con tono normal en uña", 60.0);
insert into servicios (Nomb_serv,Descrip_serv,Costo_serv) values ("Corte cabello hombre", "Corte de cabello para hombre", 80.0);
insert into servicios (Nomb_serv,Descrip_serv,Costo_serv) values ("Corte cabello mujer", "Corte de cabello para mujer", 100.0);
insert into servicios (Nomb_serv,Descrip_serv,Costo_serv) values ("Alaciado express", "Alaciado de cabello express, cualquier largo", 150.0);
insert into servicios (Nomb_serv,Descrip_serv,Costo_serv) values ("Tratamiento con keratina", "Tratamiento para cabello con keratina y alaciado", 200.0);

insert into clientes (Nomb_cliente,App_cliente,Tel_cliente,Correo_cliente,No_visitas,No_recomp) values ("Invitado","x","x","x",0,0);
insert into clientes (Nomb_cliente,App_cliente,Tel_cliente,Correo_cliente,No_visitas,No_recomp) values ("Griselda","Santamaria Lazo","2299966332","gris15@hotmail.com",0,0);
insert into clientes (Nomb_cliente,App_cliente,Tel_cliente,Correo_cliente,No_visitas,No_recomp) values ("Saul","Romero Prado","2291547887","saul1_rr@hotmail.com",0,0);
insert into clientes (Nomb_cliente,App_cliente,Tel_cliente,Correo_cliente,No_visitas,No_recomp) values ("Zulema","Luis Cruz","2294455663","zulemk@gmail.com",0,0);
insert into clientes (Nomb_cliente,App_cliente,Tel_cliente,Correo_cliente,No_visitas,No_recomp) values ("Oskar","Malaga Sanchez","2299366332","oskar_55@gmail.com",0,0);
insert into clientes (Nomb_cliente,App_cliente,Tel_cliente,Correo_cliente,No_visitas,No_recomp) values ("Ingrid","Hernandez Portugal","2291122245","ing_portu@hotmail.com",0,0);

insert into citas (Fecha_cita,Asistio,R_cliente,R_serv,R_promo,R_emp,Total_cita) values ('2021-12-01 11:00:00',"Pend",1,1,1,1, 150.0);
insert into citas (Fecha_cita,Asistio,R_cliente,R_serv,R_promo,R_emp,Total_cita) values ('2021-12-01 13:00:00',"Pend",2,7,1,2, 80.0);
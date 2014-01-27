Format 	Characters		Type			Comment
%%				n/a			The literal % character.
%c				int			A single character, represented as an C int.
%d				int			Exactly equivalent to printf("%d").
%u				unsigned int		Exactly equivalent to printf("%u").
%ld				long			Exactly equivalent to printf("%ld").
%lu				unsigned long		Exactly equivalent to printf("%lu").
%lld				long long		Exactly equivalent to printf("%lld").
%llu				unsigned long long	Exactly equivalent to printf("%llu").
%zd				Py_ssize_t		Exactly equivalent to printf("%zd").
%zu				size_t			Exactly equivalent to printf("%zu").
%i				int			Exactly equivalent to printf("%i").
%x				int			Exactly equivalent to printf("%x").
%s				char*			A null-terminated C character array.
%p				void*			The hex representation of a C pointer. 
							Mostly equivalent to printf("%p") except that it is guaranteed 
							to start with the literal 0x regardless of what the platform’s printf yields.

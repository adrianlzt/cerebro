Creating a Vec<&T> is preferable to creating a Vec<T>, since if T is large, then elems.to_vec() could be expensive.
However, if we knew that T: Copy, then to_vec would be preferable to reduce the number of pointer dereferences within elems.sort()."

using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;
using System;

[ExecuteInEditMode]
public class CreateRope : MonoBehaviour {

	// Use this for initialization
	void Start () {
	}


  // TODO:
  // partir el mesh en varios trocitos para que se pueda doblar?
  //
	// Update is called once per frame
	void Update () {
      GameObject stop = GameObject.Find("stop");
      if (stop == null) {
        Debug.Log("Creando la cuerda");

        GameObject rope;
        rope = new GameObject("MyRope");
        rope.AddComponent<Animator>();

        const float anchura = 0.1f;
        const float separacion = 0.3f;
        var posicionInicial = new Vector3(0,0,0);


        GameObject bone0;
        bone0 = new GameObject("bone0");
        bone0.transform.SetParent(rope.transform);
        bone0.transform.position = new Vector3(0, 0, 0);
        bone0.AddComponent<Rigidbody>();
        var rigidBody = bone0.GetComponent<Rigidbody>();
        rigidBody.mass = 0.01f;
        rigidBody.drag = 1f;

        bone0.AddComponent<BoxCollider>();
        BoxCollider colisionador;
        colisionador = bone0.GetComponent<BoxCollider>();
        colisionador.size = new Vector3(anchura, separacion, anchura);
        colisionador.center = new Vector3(anchura/2, separacion/2, anchura/2);
        bone0.AddComponent<HingeJoint>();
        var hiJo = bone0.GetComponent<HingeJoint>();
        hiJo.useLimits = true;
        var limites = new JointLimits();
        limites.bounciness = 0.5f;
        hiJo.limits = limites;

        GameObject box;
        box = new GameObject("box");
        box.transform.SetParent(rope.transform);
        SkinnedMeshRenderer box_skin;
        box_skin = box.AddComponent<SkinnedMeshRenderer>();
        box_skin.rootBone = bone0.transform;


        // Create mesh
        var mesh = new Mesh();

        /*
        var vertices = new Vector3[24];
        // front face
        vertices[0] = new Vector3(0, -0.5f, 0);
        vertices[1] = new Vector3(1, -0.5f, 0);
        vertices[2] = new Vector3(0, 4, 0);
        vertices[3] = new Vector3(1, 4, 0);

        // rigth face
        vertices[4] = vertices[1];
        vertices[5] = new Vector3(1, -0.5f, 1);
        vertices[6] = vertices[3];
        vertices[7] = new Vector3(1, 4, 1);

        // left face
        vertices[8] = new Vector3(0, -0.5f, 1);
        vertices[9] = vertices[0];
        vertices[10] = new Vector3(0, 4, 1);
        vertices[11] = vertices[2];

        // back face
        vertices[12] = vertices[5];
        vertices[13] = vertices[8];
        vertices[14] = vertices[7];
        vertices[15] = vertices[10];

        // bottom face
        vertices[16] = vertices[0];
        vertices[17] = vertices[1];
        vertices[18] = vertices[8];
        vertices[19] = vertices[5];

        // top face
        vertices[20] = vertices[2];
        vertices[21] = vertices[3];
        vertices[22] = vertices[10];
        vertices[23] = vertices[7];

        mesh.vertices = vertices;

        var tri  = new int[36];
        // front 1
        tri[0] = 0;
        tri[1] = 2;
        tri[2] = 1;
        // front 2
        tri[3] = 1;
        tri[4] = 2;
        tri[5] = 3;
        // right 1
        tri[6] = 4;
        tri[7] = 6;
        tri[8] = 5;
        // right 2
        tri[9] = 5;
        tri[10] = 6;
        tri[11] = 7;
        // left 1
        tri[12] = 8;
        tri[13] = 10;
        tri[14] = 11;
        // left 2
        tri[15] = 8;
        tri[16] = 11;
        tri[17] = 9;
        // back  1
        tri[18] = 12;
        tri[19] = 14;
        tri[20] = 13;
        // back 2
        tri[21] = 13;
        tri[22] = 14;
        tri[23] = 15;
        // bottom 1
        tri[24] = 16;
        tri[25] = 18;
        tri[26] = 17;
        // bottom 2
        tri[27] = 17;
        tri[28] = 18;
        tri[29] = 19;
        // top 1
        tri[30] = 20;
        tri[31] = 22;
        tri[32] = 21;
        // top 2
        tri[33] = 21;
        tri[34] = 22;
        tri[35] = 23;
        mesh.triangles = tri;

        // Vector normal al plano, para calculo de sombras
        var normals = new Vector3[24];
        // front
        normals[0] = new Vector3(0,0,-1);
        normals[1] = new Vector3(0,0,-1);
        normals[2] = new Vector3(0,0,-1);
        normals[3] = new Vector3(0,0,-1);
        // right
        normals[4] = new Vector3(1,0,0);
        normals[5] = new Vector3(1,0,0);
        normals[6] = new Vector3(1,0,0);
        normals[7] = new Vector3(1,0,0);
        // left
        normals[8] = new Vector3(-1,0,0);
        normals[9] = new Vector3(-1,0,0);
        normals[10] = new Vector3(-1,0,0);
        normals[11] = new Vector3(-1,0,0);
        // back
        normals[12] = new Vector3(0,0,1);
        normals[13] = new Vector3(0,0,1);
        normals[14] = new Vector3(0,0,1);
        normals[15] = new Vector3(0,0,1);
        // bottom
        normals[16] = new Vector3(0,-1,0);
        normals[17] = new Vector3(0,-1,0);
        normals[18] = new Vector3(0,-1,0);
        normals[19] = new Vector3(0,-1,0);
        // top
        normals[20] = new Vector3(0,1,0);
        normals[21] = new Vector3(0,1,0);
        normals[22] = new Vector3(0,1,0);
        normals[23] = new Vector3(0,1,0);
        mesh.normals = normals;

        var uv = new Vector2[24];
        // front face
        uv[0] = new Vector2(0,0);
        uv[1] = new Vector2(0,0.5f);
        uv[2] = new Vector2(0.5f,0);
        uv[3] = new Vector2(0.5f,0.5f);

        // rigth face
        uv[4] = new Vector2(0,0);
        uv[5] = new Vector2(1,0);
        uv[6] = new Vector2(1,0);
        uv[7] = new Vector2(1,1);

        // left face
        uv[8] = new Vector2(0,0);
        uv[9] = new Vector2(1,1);
        uv[10] = new Vector2(1,0);
        uv[11] = new Vector2(0,1);

        // back face
        uv[12] = new Vector2(0,0);
        uv[13] = new Vector2(1,1);
        uv[14] = new Vector2(1,0);
        uv[15] = new Vector2(1,1);

        // bottom face
        uv[16] = new Vector2(0,0);
        uv[17] = new Vector2(1,1);
        uv[18] = new Vector2(1,0);
        uv[19] = new Vector2(1,1);

        // top face
        uv[20] = new Vector2(0,0);
        uv[21] = new Vector2(1,1);
        uv[22] = new Vector2(1,0);
        uv[23] = new Vector2(1,1);
        mesh.uv = uv;
        */

        var uv = new List<Vector2>();
        var normals = new List<Vector3>();
        var vertices = new List<Vector3>();
        var triangles = new List<int>();

        CrearCubo(posicionInicial, anchura, separacion, ref vertices, ref triangles, ref normals, ref uv);

        var prevBone = bone0;

        for (int i=1; i < 18; i++) {
          CrearCubo(posicionInicial+Vector3.up*separacion*i, anchura, separacion, ref vertices, ref triangles, ref normals, ref uv);

          GameObject bone;
          bone = new GameObject("bone"+i);
          bone.transform.SetParent(prevBone.transform);
          bone.transform.position = new Vector3(0, separacion*i, 0);

          bone.AddComponent<Rigidbody>();
          var rB = bone.GetComponent<Rigidbody>();
          rB.mass = 0.01f;
          rB.drag = 1f;

          bone.AddComponent<BoxCollider>();
          BoxCollider col;
          col = bone.GetComponent<BoxCollider>();
          col.size = new Vector3(anchura, separacion, anchura);
          col.center = new Vector3(anchura/2, separacion/2, anchura/2);

          bone.AddComponent<HingeJoint>();
          var hJ = bone.GetComponent<HingeJoint>();
          hJ.useLimits = true;
          var l = new JointLimits();
          l.bounciness = 0.5f;
          hJ.limits = l;

          bone.GetComponent<HingeJoint>().connectedBody = prevBone.GetComponent<Rigidbody>();

          prevBone = bone;
        }

        mesh.vertices = vertices.ToArray();
        mesh.triangles = triangles.ToArray();
        mesh.normals = normals.ToArray();
        mesh.uv = uv.ToArray();
        box_skin.sharedMesh = mesh;

        // Add a material/shade
        box_skin.material = new Material (Shader.Find("Standard"));
      }
	}

	void CrearCubo(Vector3 xyz, float width, float height, ref List<Vector3> vertices, ref List<int> triangles, ref List<Vector3> normals, ref List<Vector2> uv) {
        CrearPlano(xyz, width, height, Vector3.forward, ref vertices, ref triangles, ref normals, ref uv);
        CrearPlano(xyz+Vector3.right*width, width, height, Vector3.right, ref vertices, ref triangles, ref normals, ref uv);
        CrearPlano(xyz+(Vector3.right+Vector3.forward)*width, width, height, Vector3.back, ref vertices, ref triangles, ref normals, ref uv);
        CrearPlano(xyz, width, height, Vector3.left, ref vertices, ref triangles, ref normals, ref uv, inv_triangles: true);
  }

	void CrearPlano(Vector3 xyz, float width, float height, Vector3 normal, ref List<Vector3> vertices, ref List<int> triangles, ref List<Vector3> normals, ref List<Vector2> uv, bool inv_triangles = false) {
    //Debug.Log("Crear Plano. xyz="+xyz+" width="+width+" height="+height+" normal="+normal+" vertices="+vertices+" triangulos="+triangles+"normals="+normals+" uv="+uv);

    // Used to write triangles values
    var index = vertices.Count;

	  var normal_xyz = new Vector2(normal.x, normal.z);
    var front_xyz = new Vector2(0,-1);

    var angle_xyz = Vector2.Angle(normal_xyz, front_xyz);
    double angle_xyz_rad = Math.PI * angle_xyz / 180.0;
    //Debug.Log("Angulo plano xyz: " + angle_xyz);

    var x_ = (float) -Math.Cos(angle_xyz_rad)*width;
    var z_ = (float) Math.Sin(angle_xyz_rad)*width;
    var toVector = new Vector3(x_, height, z_);

    var final = xyz + toVector;
    //Debug.Log("Vector final: " + final);

    // Add vertices for given point (1), moved on XZ plane (2), given plus height (3), moved plus height (4)
    vertices.Add(new Vector3(xyz.x, xyz.y, xyz.z));
    vertices.Add(new Vector3(final.x, xyz.y, final.z));
    vertices.Add(new Vector3(xyz.x, final.y, xyz.z));
    vertices.Add(new Vector3(final.x, final.y, final.z));
    //Debug.Log("Vertices tras add todos: " + vertices.ToArray());

    // Add triangles (clockise(
    if (inv_triangles) {
      triangles.Add(index);
      triangles.Add(index+1);
      triangles.Add(index+2);
      triangles.Add(index+1);
      triangles.Add(index+3);
      triangles.Add(index+2);
    } else {
      triangles.Add(index);
      triangles.Add(index+2);
      triangles.Add(index+1);
      triangles.Add(index+1);
      triangles.Add(index+2);
      triangles.Add(index+3);
    }

    // Add normals
    normals.Add(normal);
    normals.Add(normal);
    normals.Add(normal);
    normals.Add(normal);

    // Add UV
    uv.Add(new Vector2(0,0));
    uv.Add(new Vector2(0,1));
    uv.Add(new Vector2(1,0));
    uv.Add(new Vector2(1,1));

    /*
    Debug.Log("Vertices:");
    foreach (Vector3 v in vertices) {
      Debug.Log(v);
    }
    Debug.Log("Triangles:");
    foreach (int v in triangles) {
      Debug.Log(v);
    }
    Debug.Log("Normals:");
    foreach (Vector3 v in normals) {
      Debug.Log(v);
    }
    Debug.Log("UV:");
    foreach (Vector2 v in uv) {
      Debug.Log(v);
    }
    */
  }
}

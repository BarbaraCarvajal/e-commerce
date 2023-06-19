def ingresar_datos(matriz):
    for i in range(3):
        rut = input(f"Ingrese el rut del taxista {i+1}: ")
        matriz[0][i] = rut

        patente = input(f"Ingrese la patente del taxi {i+1}: ")
        matriz[1][i] = patente

        km_inicio = validar_kilometros(f"Ingrese los kilómetros de inicio del taxi {i+1}: ")
        matriz[2][i] = km_inicio

        km_fin = validar_kilometros(f"Ingrese los kilómetros de fin del taxi {i+1}: ")
        matriz[3][i] = km_fin

def mostrar_datos(matriz):
    if matriz_vacia(matriz):
        print("La matriz está vacía. Por favor, ingrese datos primero.")
        return

    for i in range(3):
        rut = matriz[0][i]
        patente = matriz[1][i]
        km_inicio = matriz[2][i]
        km_fin = matriz[3][i]

        print(f"Taxista {i+1}:")
        print(f"Rut: {rut}")
        print(f"Patente: {patente}")
        print(f"Kilómetros de inicio: {km_inicio}")
        print(f"Kilómetros de fin: {km_fin}")
        print()

def calcular_gasto_total(matriz):
    if matriz_vacia(matriz):
        print("La matriz está vacía. Por favor, ingrese datos primero.")
        return

    total_km = 0
    for i in range(3):
        km_inicio = matriz[2][i]
        km_fin = matriz[3][i]
        total_km += km_fin - km_inicio

    litros_bencina = total_km / 5
    costo_bencina = litros_bencina * 1056
    print(f"El gasto total en bencina es: ${costo_bencina}")

def matriz_vacia(matriz):
    return all(not any(row) for row in matriz)

def validar_kilometros(mensaje):
    while True:
        try:
            km = float(input(mensaje))
            if km >= 0:
                return km
            else:
                print("Por favor, ingrese un valor positivo.")
        except ValueError:
            print("Por favor, ingrese un número válido.")

matriz = [[None] * 3 for _ in range(4)]

while True:
    print("******* RAPIDITO.com *******")
    print("1. Ingresar Datos a la matriz")
    print("2. Mostrar")
    print("3. Gasto total")
    print("4. Salir")

    opcion = input("Ingrese una opción: ")

    if opcion == "1":
        ingresar_datos(matriz)
    elif opcion == "2":
        mostrar_datos(matriz)
    elif opcion == "3":
        calcular_gasto_total(matriz)
    elif opcion == "4":
        print("¡Hasta luego!")
        break
    else:
        print("Opción inválida. Por favor, ingrese una opción válida.")

import { PatternMetadata } from "./types";

// First 3 patterns for initial implementation
export const patterns: PatternMetadata[] = [
  {
    id: "singleton",
    slug: "singleton",
    name: "Singleton",
    category: "creational",
    rank: 1,
    difficulty: 1,
    tagline: "Ensure a class has only one instance",
    summary: "The Singleton pattern ensures that a class has only one instance and provides a global point of access to it.",
    metaphor: {
      title: "The Government",
      description: "Just like a country has only one government at a time, a Singleton ensures only one instance exists.",
      icon: "Landmark",
    },
    intent: "Ensure a class only has one instance, and provide a global point of access to it.",
    problem: "Sometimes you need exactly one instance of a class - a database connection pool, a configuration object, or a logging service.",
    solution: "Make the constructor private and create a static method that returns the same instance every time.",
    prerequisites: [],
    relatedPatterns: ["factory-method", "abstract-factory"],
    usedWith: ["facade", "abstract-factory"],
    useWhen: [
      "Exactly one instance of a class is needed",
      "The instance needs global access",
      "You need strict control over global variables",
    ],
    dontUseWhen: [
      "You just want a global variable",
      "Multiple instances might be needed later",
      "You need easy unit testing",
    ],
    commonMistakes: [
      "Forgetting thread safety in lazy initialization",
      "Using Singleton as a global variable replacement",
      "Making Singleton difficult to test",
    ],
    realWorldExamples: [
      "Database connection pool",
      "Application configuration",
      "Logging service",
    ],
    uml: {
      participants: [
        {
          id: "singleton",
          name: "Singleton",
          type: "class",
          attributes: ["- instance: Singleton", "- data: any"],
          methods: ["- Singleton()", "+ getInstance(): Singleton", "+ getData(): any"],
          position: { x: 250, y: 100 },
        },
      ],
      relationships: [],
      sequenceSteps: [
        { step: 1, from: "client", to: "singleton", message: "getInstance()", description: "Client requests instance" },
        { step: 2, from: "singleton", to: "singleton", message: "check instance", description: "Check if instance exists" },
        { step: 3, from: "singleton", to: "client", message: "return instance", description: "Return the singleton" },
      ],
    },
    codeExamples: [
      {
        id: "singleton-eager",
        title: "Eager Initialization",
        description: "Thread-safe, creates instance at class loading",
        language: "java",
        code: `public class Singleton {
    // Instance created at class loading
    private static final Singleton INSTANCE = new Singleton();

    // Private constructor prevents instantiation
    private Singleton() {}

    public static Singleton getInstance() {
        return INSTANCE;
    }

    public void doSomething() {
        System.out.println("Singleton is working!");
    }
}`,
      },
      {
        id: "singleton-lazy",
        title: "Lazy Thread-Safe",
        description: "Creates instance only when first needed",
        language: "java",
        code: `public class Singleton {
    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`,
        highlightLines: [6, 7, 8, 9, 10],
      },
    ],
  },
  {
    id: "factory-method",
    slug: "factory-method",
    name: "Factory Method",
    category: "creational",
    rank: 2,
    difficulty: 2,
    tagline: "Define an interface for creating objects",
    summary: "Factory Method lets a class defer instantiation to subclasses, providing flexibility in object creation.",
    metaphor: {
      title: "The Assembly Line",
      description: "Like a car factory that produces different models, Factory Method creates different products using the same process.",
      icon: "Factory",
    },
    intent: "Define an interface for creating an object, but let subclasses decide which class to instantiate.",
    problem: "You need to create objects but don't know which exact class until runtime.",
    solution: "Define a method for creating objects in a superclass, but let subclasses override it to change the type of objects created.",
    prerequisites: ["singleton"],
    relatedPatterns: ["abstract-factory", "prototype"],
    usedWith: ["singleton", "prototype"],
    useWhen: [
      "You don't know ahead of time what class you need",
      "You want subclasses to specify created objects",
      "You want to localize object creation logic",
    ],
    dontUseWhen: [
      "Object creation is straightforward",
      "You only have one type of product",
    ],
    commonMistakes: [
      "Creating too many factory classes",
      "Overusing when simple constructors would work",
    ],
    realWorldExamples: [
      "Document creation (Word, PDF, HTML)",
      "UI element creation across platforms",
      "Database driver instantiation",
    ],
    uml: {
      participants: [
        {
          id: "creator",
          name: "Creator",
          type: "abstract",
          attributes: [],
          methods: ["+ factoryMethod(): Product", "+ operation(): void"],
          position: { x: 100, y: 50 },
        },
        {
          id: "concrete-creator",
          name: "ConcreteCreator",
          type: "class",
          attributes: [],
          methods: ["+ factoryMethod(): Product"],
          position: { x: 100, y: 200 },
        },
        {
          id: "product",
          name: "Product",
          type: "interface",
          attributes: [],
          methods: ["+ use(): void"],
          position: { x: 350, y: 50 },
        },
        {
          id: "concrete-product",
          name: "ConcreteProduct",
          type: "class",
          attributes: [],
          methods: ["+ use(): void"],
          position: { x: 350, y: 200 },
        },
      ],
      relationships: [
        { from: "concrete-creator", to: "creator", type: "inheritance" },
        { from: "concrete-product", to: "product", type: "implementation" },
        { from: "creator", to: "product", type: "dependency", label: "creates" },
      ],
    },
    codeExamples: [
      {
        id: "factory-basic",
        title: "Basic Factory Method",
        description: "Abstract creator with concrete implementations",
        language: "java",
        code: `// Product interface
interface Button {
    void render();
    void onClick();
}

// Concrete products
class WindowsButton implements Button {
    public void render() {
        System.out.println("Render Windows button");
    }
    public void onClick() {
        System.out.println("Windows click!");
    }
}

class MacButton implements Button {
    public void render() {
        System.out.println("Render Mac button");
    }
    public void onClick() {
        System.out.println("Mac click!");
    }
}

// Creator
abstract class Dialog {
    public void renderWindow() {
        Button btn = createButton();
        btn.render();
    }

    // Factory Method
    public abstract Button createButton();
}

// Concrete creators
class WindowsDialog extends Dialog {
    public Button createButton() {
        return new WindowsButton();
    }
}

class MacDialog extends Dialog {
    public Button createButton() {
        return new MacButton();
    }
}`,
      },
    ],
  },
  {
    id: "strategy",
    slug: "strategy",
    name: "Strategy",
    category: "behavioral",
    rank: 3,
    difficulty: 2,
    tagline: "Define a family of interchangeable algorithms",
    summary: "Strategy lets you define a family of algorithms, encapsulate each one, and make them interchangeable at runtime.",
    metaphor: {
      title: "GPS Navigation",
      description: "Like choosing between fastest route, shortest route, or scenic route - different strategies for the same goal.",
      icon: "Route",
    },
    intent: "Define a family of algorithms, encapsulate each one, and make them interchangeable.",
    problem: "You need to use different variants of an algorithm within an object and switch between them at runtime.",
    solution: "Extract all algorithms into separate classes called strategies, and let the context delegate work to a strategy object.",
    prerequisites: [],
    relatedPatterns: ["state", "decorator"],
    usedWith: ["factory-method"],
    useWhen: [
      "You have many related classes differing only in behavior",
      "You need different variants of an algorithm",
      "You want to avoid exposing complex algorithm code",
    ],
    dontUseWhen: [
      "Algorithms rarely change",
      "You only have a few simple algorithms",
    ],
    commonMistakes: [
      "Creating a strategy for every tiny variation",
      "Clients needing to understand strategy differences",
    ],
    realWorldExamples: [
      "Sorting algorithms (quick sort, merge sort)",
      "Payment methods (credit card, PayPal)",
      "Compression algorithms",
    ],
    uml: {
      participants: [
        {
          id: "context",
          name: "Context",
          type: "class",
          attributes: ["- strategy: Strategy"],
          methods: ["+ setStrategy(s)", "+ execute()"],
          position: { x: 100, y: 100 },
        },
        {
          id: "strategy",
          name: "Strategy",
          type: "interface",
          attributes: [],
          methods: ["+ algorithm()"],
          position: { x: 350, y: 100 },
        },
        {
          id: "concrete-a",
          name: "ConcreteStrategyA",
          type: "class",
          attributes: [],
          methods: ["+ algorithm()"],
          position: { x: 250, y: 250 },
        },
        {
          id: "concrete-b",
          name: "ConcreteStrategyB",
          type: "class",
          attributes: [],
          methods: ["+ algorithm()"],
          position: { x: 450, y: 250 },
        },
      ],
      relationships: [
        { from: "context", to: "strategy", type: "aggregation" },
        { from: "concrete-a", to: "strategy", type: "implementation" },
        { from: "concrete-b", to: "strategy", type: "implementation" },
      ],
    },
    codeExamples: [
      {
        id: "strategy-payment",
        title: "Payment Strategy",
        description: "Different payment methods as strategies",
        language: "java",
        code: `// Strategy interface
interface PaymentStrategy {
    void pay(int amount);
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;

    public CreditCardPayment(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void pay(int amount) {
        System.out.println("Paid " + amount + " via Credit Card");
    }
}

class PayPalPayment implements PaymentStrategy {
    private String email;

    public PayPalPayment(String email) {
        this.email = email;
    }

    public void pay(int amount) {
        System.out.println("Paid " + amount + " via PayPal");
    }
}

// Context
class ShoppingCart {
    private PaymentStrategy paymentStrategy;

    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }

    public void checkout(int amount) {
        paymentStrategy.pay(amount);
    }
}

// Usage
ShoppingCart cart = new ShoppingCart();
cart.setPaymentStrategy(new CreditCardPayment("1234-5678"));
cart.checkout(100);`,
      },
    ],
  },
  {
    id: "observer",
    slug: "observer",
    name: "Observer",
    category: "behavioral",
    rank: 4,
    difficulty: 2,
    tagline: "Define a one-to-many dependency between objects",
    summary: "Observer lets objects subscribe to events and get notified when something happens, enabling loose coupling between components.",
    metaphor: {
      title: "News Broadcast",
      description: "Like a TV news channel broadcasting to all subscribers - when news happens, everyone tuned in gets notified automatically.",
      icon: "Radio",
    },
    intent: "Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
    problem: "You need to notify multiple objects about changes in another object without creating tight coupling.",
    solution: "Define a subscription mechanism that lets objects subscribe to and unsubscribe from events, then notify all subscribers when an event occurs.",
    prerequisites: [],
    relatedPatterns: ["mediator", "singleton"],
    usedWith: ["mediator"],
    useWhen: [
      "Changes to one object require changing others, and you don't know how many",
      "An object should notify others without knowing who they are",
      "You want loose coupling between related objects",
    ],
    dontUseWhen: [
      "You have only one observer",
      "Notification order matters critically",
    ],
    commonMistakes: [
      "Forgetting to unsubscribe (memory leaks)",
      "Creating circular dependencies",
      "Notifying observers during object construction",
    ],
    realWorldExamples: [
      "Event listeners in UI frameworks",
      "Pub/Sub messaging systems",
      "Model-View-Controller pattern",
    ],
    uml: {
      participants: [
        { id: "subject", name: "Subject", type: "interface", attributes: [], methods: ["+ attach(o)", "+ detach(o)", "+ notify()"], position: { x: 100, y: 50 } },
        { id: "concrete-subject", name: "ConcreteSubject", type: "class", attributes: ["- state", "- observers[]"], methods: ["+ getState()", "+ setState()"], position: { x: 100, y: 200 } },
        { id: "observer", name: "Observer", type: "interface", attributes: [], methods: ["+ update()"], position: { x: 350, y: 50 } },
        { id: "concrete-observer", name: "ConcreteObserver", type: "class", attributes: ["- subject"], methods: ["+ update()"], position: { x: 350, y: 200 } },
      ],
      relationships: [
        { from: "concrete-subject", to: "subject", type: "implementation" },
        { from: "concrete-observer", to: "observer", type: "implementation" },
        { from: "subject", to: "observer", type: "association", label: "notifies" },
      ],
    },
    codeExamples: [
      {
        id: "observer-basic",
        title: "Basic Observer",
        description: "Subject notifies observers of state changes",
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

// Observer interface
interface Observer {
    void update(String message);
}

// Subject class
class NewsAgency {
    private List<Observer> observers = new ArrayList<>();
    private String news;

    public void addObserver(Observer o) {
        observers.add(o);
    }

    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    public void setNews(String news) {
        this.news = news;
        notifyObservers();
    }

    private void notifyObservers() {
        for (Observer o : observers) {
            o.update(news);
        }
    }
}

// Concrete Observer
class NewsChannel implements Observer {
    private String name;

    public NewsChannel(String name) {
        this.name = name;
    }

    @Override
    public void update(String news) {
        System.out.println(name + " received: " + news);
    }
}

// Usage
NewsAgency agency = new NewsAgency();
agency.addObserver(new NewsChannel("CNN"));
agency.addObserver(new NewsChannel("BBC"));
agency.setNews("Breaking news!");`,
      },
    ],
  },
  {
    id: "decorator",
    slug: "decorator",
    name: "Decorator",
    category: "structural",
    rank: 5,
    difficulty: 2,
    tagline: "Attach additional responsibilities dynamically",
    summary: "Decorator lets you add new behaviors to objects by wrapping them in decorator objects that contain the new behaviors.",
    metaphor: {
      title: "Russian Nesting Dolls",
      description: "Like Matryoshka dolls that fit inside each other, each decorator wraps the previous one, adding a layer of functionality.",
      icon: "Layers",
    },
    intent: "Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.",
    problem: "You need to add behaviors to individual objects without affecting other objects of the same class.",
    solution: "Wrap the original object in a decorator class that has the same interface and delegates to the original while adding new behavior.",
    prerequisites: [],
    relatedPatterns: ["composite", "strategy"],
    usedWith: ["composite"],
    useWhen: [
      "You need to add responsibilities to objects dynamically and transparently",
      "Extension by subclassing is impractical",
      "You want to combine multiple behaviors",
    ],
    dontUseWhen: [
      "You only need one specific behavior",
      "The order of decorators doesn't matter",
    ],
    commonMistakes: [
      "Creating too many small decorator classes",
      "Forgetting to delegate to the wrapped object",
      "Order-dependent decorators causing bugs",
    ],
    realWorldExamples: [
      "Java I/O Streams (BufferedInputStream wraps FileInputStream)",
      "UI component styling",
      "Middleware in web frameworks",
    ],
    uml: {
      participants: [
        { id: "component", name: "Component", type: "interface", attributes: [], methods: ["+ operation()"], position: { x: 200, y: 30 } },
        { id: "concrete", name: "ConcreteComponent", type: "class", attributes: [], methods: ["+ operation()"], position: { x: 50, y: 180 } },
        { id: "decorator", name: "Decorator", type: "abstract", attributes: ["- component"], methods: ["+ operation()"], position: { x: 350, y: 180 } },
        { id: "concrete-dec", name: "ConcreteDecorator", type: "class", attributes: [], methods: ["+ operation()", "+ addedBehavior()"], position: { x: 350, y: 330 } },
      ],
      relationships: [
        { from: "concrete", to: "component", type: "implementation" },
        { from: "decorator", to: "component", type: "implementation" },
        { from: "decorator", to: "component", type: "aggregation" },
        { from: "concrete-dec", to: "decorator", type: "inheritance" },
      ],
    },
    codeExamples: [
      {
        id: "decorator-coffee",
        title: "Coffee Decorator",
        description: "Adding toppings to a coffee order",
        language: "java",
        code: `// Component interface
interface Coffee {
    double getCost();
    String getDescription();
}

// Concrete component
class SimpleCoffee implements Coffee {
    public double getCost() { return 2.0; }
    public String getDescription() { return "Coffee"; }
}

// Base decorator
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    public CoffeeDecorator(Coffee c) { this.coffee = c; }
    public double getCost() { return coffee.getCost(); }
    public String getDescription() { return coffee.getDescription(); }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee c) { super(c); }
    public double getCost() { return super.getCost() + 0.5; }
    public String getDescription() { return super.getDescription() + ", Milk"; }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee c) { super(c); }
    public double getCost() { return super.getCost() + 0.2; }
    public String getDescription() { return super.getDescription() + ", Sugar"; }
}

// Usage
Coffee coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
System.out.println(coffee.getDescription()); // Coffee, Milk, Sugar
System.out.println(coffee.getCost());        // 2.7`,
      },
    ],
  },
  {
    id: "adapter",
    slug: "adapter",
    name: "Adapter",
    category: "structural",
    rank: 6,
    difficulty: 2,
    tagline: "Convert one interface into another",
    summary: "Adapter allows incompatible interfaces to work together by wrapping an object with a new interface.",
    metaphor: {
      title: "Power Adapter",
      description: "Like a travel power adapter that lets you plug your device into any outlet worldwide - it converts the interface without changing the device.",
      icon: "Plug",
    },
    intent: "Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.",
    problem: "You have a class with an incompatible interface that you need to use with existing code.",
    solution: "Create an adapter class that wraps the incompatible class and translates calls between the interfaces.",
    prerequisites: [],
    relatedPatterns: ["bridge", "decorator", "proxy"],
    usedWith: ["facade"],
    useWhen: [
      "You want to use an existing class but its interface doesn't match",
      "You want to create a reusable class that works with unrelated classes",
      "You need to use several existing subclasses",
    ],
    dontUseWhen: [
      "The interfaces are already compatible",
      "You can modify the existing class",
    ],
    commonMistakes: [
      "Creating adapters for trivial differences",
      "Adapting too much functionality at once",
    ],
    realWorldExamples: [
      "JDBC drivers adapting database APIs",
      "Arrays.asList() adapting arrays to Lists",
      "Legacy system integration",
    ],
    uml: {
      participants: [
        { id: "target", name: "Target", type: "interface", attributes: [], methods: ["+ request()"], position: { x: 100, y: 50 } },
        { id: "adapter", name: "Adapter", type: "class", attributes: ["- adaptee"], methods: ["+ request()"], position: { x: 100, y: 200 } },
        { id: "adaptee", name: "Adaptee", type: "class", attributes: [], methods: ["+ specificRequest()"], position: { x: 350, y: 200 } },
      ],
      relationships: [
        { from: "adapter", to: "target", type: "implementation" },
        { from: "adapter", to: "adaptee", type: "association", label: "wraps" },
      ],
    },
    codeExamples: [
      {
        id: "adapter-basic",
        title: "Media Player Adapter",
        description: "Adapting different media formats to a common interface",
        language: "java",
        code: `// Target interface
interface MediaPlayer {
    void play(String filename);
}

// Adaptee - incompatible interface
class VlcPlayer {
    public void playVlc(String filename) {
        System.out.println("Playing VLC: " + filename);
    }
}

// Adapter
class VlcAdapter implements MediaPlayer {
    private VlcPlayer vlcPlayer;

    public VlcAdapter() {
        vlcPlayer = new VlcPlayer();
    }

    @Override
    public void play(String filename) {
        vlcPlayer.playVlc(filename);
    }
}

// Usage
MediaPlayer player = new VlcAdapter();
player.play("movie.vlc");`,
      },
    ],
  },
  {
    id: "facade",
    slug: "facade",
    name: "Facade",
    category: "structural",
    rank: 7,
    difficulty: 2,
    tagline: "Provide a simplified interface to a complex subsystem",
    summary: "Facade provides a unified, simple interface to a set of interfaces in a subsystem, making it easier to use.",
    metaphor: {
      title: "Hotel Concierge",
      description: "Like a hotel concierge who handles all your requests - you just ask for what you need, and they coordinate everything behind the scenes.",
      icon: "Building2",
    },
    intent: "Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.",
    problem: "A complex subsystem has many classes and using them correctly requires understanding their dependencies.",
    solution: "Create a facade class that provides a simple interface to the complex subsystem, delegating calls to the appropriate subsystem objects.",
    prerequisites: [],
    relatedPatterns: ["adapter", "mediator", "singleton"],
    usedWith: ["singleton"],
    useWhen: [
      "You want a simple interface to a complex subsystem",
      "There are many dependencies between clients and subsystem classes",
      "You want to layer your subsystems",
    ],
    dontUseWhen: [
      "The subsystem is already simple",
      "Clients need full access to subsystem features",
    ],
    commonMistakes: [
      "Making the facade a god object",
      "Exposing subsystem internals through the facade",
    ],
    realWorldExamples: [
      "SLF4J logging facade",
      "jQuery simplifying DOM manipulation",
      "Spring's JdbcTemplate",
    ],
    uml: {
      participants: [
        { id: "facade", name: "Facade", type: "class", attributes: [], methods: ["+ operation()"], position: { x: 200, y: 50 } },
        { id: "sub1", name: "SubsystemA", type: "class", attributes: [], methods: ["+ operationA()"], position: { x: 50, y: 200 } },
        { id: "sub2", name: "SubsystemB", type: "class", attributes: [], methods: ["+ operationB()"], position: { x: 200, y: 200 } },
        { id: "sub3", name: "SubsystemC", type: "class", attributes: [], methods: ["+ operationC()"], position: { x: 350, y: 200 } },
      ],
      relationships: [
        { from: "facade", to: "sub1", type: "dependency" },
        { from: "facade", to: "sub2", type: "dependency" },
        { from: "facade", to: "sub3", type: "dependency" },
      ],
    },
    codeExamples: [
      {
        id: "facade-computer",
        title: "Computer Startup Facade",
        description: "Simple interface to start a complex computer system",
        language: "java",
        code: `// Complex subsystem classes
class CPU {
    public void freeze() { System.out.println("CPU freeze"); }
    public void jump(long addr) { System.out.println("CPU jump"); }
    public void execute() { System.out.println("CPU execute"); }
}

class Memory {
    public void load(long addr, byte[] data) {
        System.out.println("Memory load");
    }
}

class HardDrive {
    public byte[] read(long sector, int size) {
        System.out.println("HardDrive read");
        return new byte[size];
    }
}

// Facade
class ComputerFacade {
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;

    public ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    public void start() {
        cpu.freeze();
        memory.load(0, hardDrive.read(0, 1024));
        cpu.jump(0);
        cpu.execute();
    }
}

// Usage - Simple!
ComputerFacade computer = new ComputerFacade();
computer.start();`,
      },
    ],
  },
  {
    id: "composite",
    slug: "composite",
    name: "Composite",
    category: "structural",
    rank: 8,
    difficulty: 3,
    tagline: "Compose objects into tree structures",
    summary: "Composite lets you build tree structures where individual objects and compositions are treated uniformly.",
    metaphor: {
      title: "File System",
      description: "Like files and folders on your computer - folders can contain files or other folders, but you interact with them the same way.",
      icon: "FolderTree",
    },
    intent: "Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions uniformly.",
    problem: "You need to represent tree structures where both individual elements and groups of elements are treated the same.",
    solution: "Create a component interface implemented by both leaf objects and composite objects that can contain other components.",
    prerequisites: ["decorator"],
    relatedPatterns: ["decorator", "iterator", "visitor"],
    usedWith: ["iterator", "visitor"],
    useWhen: [
      "You want to represent part-whole hierarchies",
      "You want clients to ignore the difference between compositions and individuals",
      "The structure can be nested arbitrarily deep",
    ],
    dontUseWhen: [
      "The structure is flat",
      "Different operations are needed for leaves vs composites",
    ],
    commonMistakes: [
      "Making the interface too specific to composites",
      "Forgetting to handle cycles in the structure",
    ],
    realWorldExamples: [
      "File systems (files and directories)",
      "UI component hierarchies",
      "Organization charts",
    ],
    uml: {
      participants: [
        { id: "component", name: "Component", type: "interface", attributes: [], methods: ["+ operation()", "+ add(c)", "+ remove(c)"], position: { x: 200, y: 30 } },
        { id: "leaf", name: "Leaf", type: "class", attributes: [], methods: ["+ operation()"], position: { x: 50, y: 180 } },
        { id: "composite", name: "Composite", type: "class", attributes: ["- children[]"], methods: ["+ operation()", "+ add(c)", "+ remove(c)"], position: { x: 350, y: 180 } },
      ],
      relationships: [
        { from: "leaf", to: "component", type: "implementation" },
        { from: "composite", to: "component", type: "implementation" },
        { from: "composite", to: "component", type: "aggregation", label: "children" },
      ],
    },
    codeExamples: [
      {
        id: "composite-files",
        title: "File System",
        description: "Files and directories as a composite structure",
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

// Component
interface FileSystemItem {
    void showDetails();
    int getSize();
}

// Leaf
class File implements FileSystemItem {
    private String name;
    private int size;

    public File(String name, int size) {
        this.name = name;
        this.size = size;
    }

    public void showDetails() {
        System.out.println("File: " + name + " (" + size + "KB)");
    }

    public int getSize() { return size; }
}

// Composite
class Directory implements FileSystemItem {
    private String name;
    private List<FileSystemItem> items = new ArrayList<>();

    public Directory(String name) { this.name = name; }

    public void add(FileSystemItem item) { items.add(item); }
    public void remove(FileSystemItem item) { items.remove(item); }

    public void showDetails() {
        System.out.println("Directory: " + name);
        for (FileSystemItem item : items) {
            item.showDetails();
        }
    }

    public int getSize() {
        return items.stream().mapToInt(FileSystemItem::getSize).sum();
    }
}

// Usage
Directory root = new Directory("root");
root.add(new File("readme.txt", 10));
Directory docs = new Directory("docs");
docs.add(new File("doc1.pdf", 100));
root.add(docs);
root.showDetails();`,
      },
    ],
  },
  {
    id: "proxy",
    slug: "proxy",
    name: "Proxy",
    category: "structural",
    rank: 9,
    difficulty: 3,
    tagline: "Provide a surrogate for another object",
    summary: "Proxy provides a placeholder for another object to control access, add functionality, or delay instantiation.",
    metaphor: {
      title: "Security Guard",
      description: "Like a security guard who checks credentials before allowing entry - the proxy controls access to the real object.",
      icon: "Shield",
    },
    intent: "Provide a surrogate or placeholder for another object to control access to it.",
    problem: "You need to control access to an object, add lazy initialization, logging, or caching.",
    solution: "Create a proxy class with the same interface that holds a reference to the real object and controls access to it.",
    prerequisites: ["decorator"],
    relatedPatterns: ["adapter", "decorator"],
    usedWith: ["decorator"],
    useWhen: [
      "You need lazy initialization (virtual proxy)",
      "You need access control (protection proxy)",
      "You need logging or caching (smart proxy)",
    ],
    dontUseWhen: [
      "Direct access is acceptable",
      "The overhead isn't justified",
    ],
    commonMistakes: [
      "Creating proxies for everything",
      "Not considering thread safety",
    ],
    realWorldExamples: [
      "Lazy loading of images",
      "Spring AOP proxies",
      "Remote proxies (RMI)",
    ],
    uml: {
      participants: [
        { id: "subject", name: "Subject", type: "interface", attributes: [], methods: ["+ request()"], position: { x: 200, y: 30 } },
        { id: "real", name: "RealSubject", type: "class", attributes: [], methods: ["+ request()"], position: { x: 50, y: 180 } },
        { id: "proxy", name: "Proxy", type: "class", attributes: ["- realSubject"], methods: ["+ request()"], position: { x: 350, y: 180 } },
      ],
      relationships: [
        { from: "real", to: "subject", type: "implementation" },
        { from: "proxy", to: "subject", type: "implementation" },
        { from: "proxy", to: "real", type: "association", label: "controls" },
      ],
    },
    codeExamples: [
      {
        id: "proxy-image",
        title: "Image Proxy",
        description: "Lazy loading images with a proxy",
        language: "java",
        code: `// Subject interface
interface Image {
    void display();
}

// Real subject - expensive to create
class RealImage implements Image {
    private String filename;

    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }

    private void loadFromDisk() {
        System.out.println("Loading " + filename);
    }

    public void display() {
        System.out.println("Displaying " + filename);
    }
}

// Proxy - lazy loads the real image
class ImageProxy implements Image {
    private RealImage realImage;
    private String filename;

    public ImageProxy(String filename) {
        this.filename = filename;
    }

    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename);
        }
        realImage.display();
    }
}

// Usage
Image image = new ImageProxy("photo.jpg");
// Image not loaded yet
image.display(); // Now it loads and displays`,
      },
    ],
  },
  {
    id: "bridge",
    slug: "bridge",
    name: "Bridge",
    category: "structural",
    rank: 10,
    difficulty: 3,
    tagline: "Separate abstraction from implementation",
    summary: "Bridge decouples an abstraction from its implementation so both can vary independently.",
    metaphor: {
      title: "Remote Control",
      description: "Like how any TV remote can work with any TV brand - the remote (abstraction) and TV (implementation) can vary independently.",
      icon: "Unplug",
    },
    intent: "Decouple an abstraction from its implementation so that the two can vary independently.",
    problem: "You have a class hierarchy that combines multiple dimensions of variation, leading to an explosion of subclasses.",
    solution: "Separate the abstraction hierarchy from the implementation hierarchy and connect them via composition.",
    prerequisites: ["adapter"],
    relatedPatterns: ["adapter", "strategy"],
    usedWith: ["abstract-factory"],
    useWhen: [
      "You want to avoid permanent binding between abstraction and implementation",
      "Both abstraction and implementation should be extensible",
      "You have multiple dimensions of variation",
    ],
    dontUseWhen: [
      "There's only one implementation",
      "The abstraction-implementation relationship is simple",
    ],
    commonMistakes: [
      "Overcomplicating simple hierarchies",
      "Confusing Bridge with Adapter",
    ],
    realWorldExamples: [
      "GUI frameworks (Window/WindowImpl)",
      "Device drivers",
      "Platform-independent graphics",
    ],
    uml: {
      participants: [
        { id: "abstraction", name: "Abstraction", type: "class", attributes: ["- impl"], methods: ["+ operation()"], position: { x: 100, y: 50 } },
        { id: "refined", name: "RefinedAbstraction", type: "class", attributes: [], methods: ["+ operation()"], position: { x: 100, y: 200 } },
        { id: "impl", name: "Implementor", type: "interface", attributes: [], methods: ["+ operationImpl()"], position: { x: 350, y: 50 } },
        { id: "concrete-impl", name: "ConcreteImplementor", type: "class", attributes: [], methods: ["+ operationImpl()"], position: { x: 350, y: 200 } },
      ],
      relationships: [
        { from: "refined", to: "abstraction", type: "inheritance" },
        { from: "concrete-impl", to: "impl", type: "implementation" },
        { from: "abstraction", to: "impl", type: "aggregation" },
      ],
    },
    codeExamples: [
      {
        id: "bridge-device",
        title: "Device Remote Bridge",
        description: "Remotes and devices can vary independently",
        language: "java",
        code: `// Implementor
interface Device {
    void turnOn();
    void turnOff();
    void setVolume(int volume);
}

// Concrete Implementors
class TV implements Device {
    public void turnOn() { System.out.println("TV on"); }
    public void turnOff() { System.out.println("TV off"); }
    public void setVolume(int v) { System.out.println("TV volume: " + v); }
}

class Radio implements Device {
    public void turnOn() { System.out.println("Radio on"); }
    public void turnOff() { System.out.println("Radio off"); }
    public void setVolume(int v) { System.out.println("Radio volume: " + v); }
}

// Abstraction
class Remote {
    protected Device device;
    public Remote(Device d) { this.device = d; }
    public void togglePower() { device.turnOn(); }
}

// Refined Abstraction
class AdvancedRemote extends Remote {
    public AdvancedRemote(Device d) { super(d); }
    public void mute() { device.setVolume(0); }
}

// Usage - mix and match!
Remote tvRemote = new AdvancedRemote(new TV());
Remote radioRemote = new Remote(new Radio());`,
      },
    ],
  },
  {
    id: "builder",
    slug: "builder",
    name: "Builder",
    category: "creational",
    rank: 11,
    difficulty: 3,
    tagline: "Construct complex objects step by step",
    summary: "Builder separates the construction of a complex object from its representation, allowing the same process to create different representations.",
    metaphor: {
      title: "LEGO Assembly",
      description: "Like building a LEGO set step by step from instructions - you add pieces one at a time to create the final product.",
      icon: "Blocks",
    },
    intent: "Separate the construction of a complex object from its representation so that the same construction process can create different representations.",
    problem: "You need to create complex objects with many optional parameters, and constructors with many parameters are hard to use.",
    solution: "Create a builder class that constructs the object step by step, with methods for each optional part.",
    prerequisites: ["factory-method"],
    relatedPatterns: ["abstract-factory", "composite"],
    usedWith: ["singleton"],
    useWhen: [
      "Creating an object involves many steps",
      "Objects have many optional parameters",
      "You want immutable objects with many fields",
    ],
    dontUseWhen: [
      "Objects are simple with few parameters",
      "All parameters are required",
    ],
    commonMistakes: [
      "Making the builder mutable when the product should be immutable",
      "Forgetting to reset the builder between uses",
    ],
    realWorldExamples: [
      "StringBuilder in Java",
      "HTTP request builders",
      "SQL query builders",
    ],
    uml: {
      participants: [
        { id: "director", name: "Director", type: "class", attributes: [], methods: ["+ construct()"], position: { x: 50, y: 100 } },
        { id: "builder", name: "Builder", type: "interface", attributes: [], methods: ["+ buildPartA()", "+ buildPartB()", "+ getResult()"], position: { x: 250, y: 50 } },
        { id: "concrete", name: "ConcreteBuilder", type: "class", attributes: [], methods: ["+ buildPartA()", "+ buildPartB()", "+ getResult()"], position: { x: 250, y: 200 } },
        { id: "product", name: "Product", type: "class", attributes: [], methods: [], position: { x: 450, y: 200 } },
      ],
      relationships: [
        { from: "director", to: "builder", type: "association" },
        { from: "concrete", to: "builder", type: "implementation" },
        { from: "concrete", to: "product", type: "dependency", label: "creates" },
      ],
    },
    codeExamples: [
      {
        id: "builder-pizza",
        title: "Pizza Builder",
        description: "Build pizzas step by step",
        language: "java",
        code: `class Pizza {
    private String dough;
    private String sauce;
    private String topping;

    private Pizza(Builder builder) {
        this.dough = builder.dough;
        this.sauce = builder.sauce;
        this.topping = builder.topping;
    }

    // Builder class
    public static class Builder {
        private String dough = "regular";
        private String sauce = "tomato";
        private String topping = "cheese";

        public Builder dough(String dough) {
            this.dough = dough;
            return this;
        }

        public Builder sauce(String sauce) {
            this.sauce = sauce;
            return this;
        }

        public Builder topping(String topping) {
            this.topping = topping;
            return this;
        }

        public Pizza build() {
            return new Pizza(this);
        }
    }
}

// Usage - fluent interface
Pizza pizza = new Pizza.Builder()
    .dough("thin crust")
    .sauce("bbq")
    .topping("pepperoni")
    .build();`,
      },
    ],
  },
  {
    id: "abstract-factory",
    slug: "abstract-factory",
    name: "Abstract Factory",
    category: "creational",
    rank: 12,
    difficulty: 3,
    tagline: "Create families of related objects",
    summary: "Abstract Factory provides an interface for creating families of related objects without specifying their concrete classes.",
    metaphor: {
      title: "Furniture Warehouse",
      description: "Like ordering a furniture set - you choose a style (Modern, Victorian) and get matching chairs, tables, and sofas that go together.",
      icon: "Warehouse",
    },
    intent: "Provide an interface for creating families of related or dependent objects without specifying their concrete classes.",
    problem: "You need to create families of related objects that must be used together, and you want to ensure compatibility.",
    solution: "Create an abstract factory interface with methods for each product type, and concrete factories that produce compatible product families.",
    prerequisites: ["factory-method"],
    relatedPatterns: ["factory-method", "builder", "singleton"],
    usedWith: ["singleton"],
    useWhen: [
      "A system should be independent of how products are created",
      "Products need to be used together as a family",
      "You want to provide a library of products",
    ],
    dontUseWhen: [
      "Products don't need to be compatible",
      "There's only one product family",
    ],
    commonMistakes: [
      "Creating too many product types in one factory",
      "Not making factories easily extensible",
    ],
    realWorldExamples: [
      "UI toolkit themes (light/dark mode)",
      "Database access layers",
      "Cross-platform GUI libraries",
    ],
    uml: {
      participants: [
        { id: "abstract-factory", name: "AbstractFactory", type: "interface", attributes: [], methods: ["+ createProductA()", "+ createProductB()"], position: { x: 50, y: 50 } },
        { id: "concrete-factory", name: "ConcreteFactory", type: "class", attributes: [], methods: ["+ createProductA()", "+ createProductB()"], position: { x: 50, y: 200 } },
        { id: "product-a", name: "AbstractProductA", type: "interface", attributes: [], methods: [], position: { x: 300, y: 50 } },
        { id: "product-b", name: "AbstractProductB", type: "interface", attributes: [], methods: [], position: { x: 450, y: 50 } },
      ],
      relationships: [
        { from: "concrete-factory", to: "abstract-factory", type: "implementation" },
        { from: "abstract-factory", to: "product-a", type: "dependency", label: "creates" },
        { from: "abstract-factory", to: "product-b", type: "dependency", label: "creates" },
      ],
    },
    codeExamples: [
      {
        id: "abstract-factory-ui",
        title: "UI Theme Factory",
        description: "Creating themed UI components",
        language: "java",
        code: `// Abstract Products
interface Button { void render(); }
interface Checkbox { void render(); }

// Concrete Products - Light Theme
class LightButton implements Button {
    public void render() { System.out.println("Light button"); }
}
class LightCheckbox implements Checkbox {
    public void render() { System.out.println("Light checkbox"); }
}

// Concrete Products - Dark Theme
class DarkButton implements Button {
    public void render() { System.out.println("Dark button"); }
}
class DarkCheckbox implements Checkbox {
    public void render() { System.out.println("Dark checkbox"); }
}

// Abstract Factory
interface UIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// Concrete Factories
class LightThemeFactory implements UIFactory {
    public Button createButton() { return new LightButton(); }
    public Checkbox createCheckbox() { return new LightCheckbox(); }
}

class DarkThemeFactory implements UIFactory {
    public Button createButton() { return new DarkButton(); }
    public Checkbox createCheckbox() { return new DarkCheckbox(); }
}

// Usage
UIFactory factory = new DarkThemeFactory();
Button btn = factory.createButton();
Checkbox cb = factory.createCheckbox();`,
      },
    ],
  },
  {
    id: "prototype",
    slug: "prototype",
    name: "Prototype",
    category: "creational",
    rank: 13,
    difficulty: 2,
    tagline: "Clone existing objects",
    summary: "Prototype creates new objects by copying existing ones, avoiding the cost of creating from scratch.",
    metaphor: {
      title: "Cell Division",
      description: "Like how cells divide to create copies of themselves - the prototype pattern clones objects instead of creating new ones from scratch.",
      icon: "Copy",
    },
    intent: "Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.",
    problem: "Creating objects is expensive or complex, and you need many similar objects with slight variations.",
    solution: "Create a prototype interface with a clone method, and have objects copy themselves when new instances are needed.",
    prerequisites: [],
    relatedPatterns: ["abstract-factory", "composite", "decorator"],
    usedWith: ["composite"],
    useWhen: [
      "Object creation is more expensive than cloning",
      "You need copies of complex objects",
      "You want to avoid subclass proliferation",
    ],
    dontUseWhen: [
      "Objects are simple to create",
      "Deep copying is too complex",
    ],
    commonMistakes: [
      "Shallow copy when deep copy is needed",
      "Forgetting to clone nested objects",
    ],
    realWorldExamples: [
      "Object.clone() in Java",
      "Spreadsheet cell copying",
      "Game object spawning",
    ],
    uml: {
      participants: [
        { id: "prototype", name: "Prototype", type: "interface", attributes: [], methods: ["+ clone()"], position: { x: 200, y: 50 } },
        { id: "concrete-a", name: "ConcretePrototypeA", type: "class", attributes: [], methods: ["+ clone()"], position: { x: 100, y: 200 } },
        { id: "concrete-b", name: "ConcretePrototypeB", type: "class", attributes: [], methods: ["+ clone()"], position: { x: 300, y: 200 } },
      ],
      relationships: [
        { from: "concrete-a", to: "prototype", type: "implementation" },
        { from: "concrete-b", to: "prototype", type: "implementation" },
      ],
    },
    codeExamples: [
      {
        id: "prototype-shape",
        title: "Shape Prototype",
        description: "Cloning shapes with their properties",
        language: "java",
        code: `// Prototype interface
interface Shape extends Cloneable {
    Shape clone();
    void draw();
}

// Concrete prototypes
class Circle implements Shape {
    private int radius;
    private String color;

    public Circle(int r, String c) {
        this.radius = r;
        this.color = c;
    }

    // Copy constructor for cloning
    private Circle(Circle source) {
        this.radius = source.radius;
        this.color = source.color;
    }

    public Shape clone() {
        return new Circle(this);
    }

    public void draw() {
        System.out.println("Circle: " + color + ", r=" + radius);
    }
}

// Usage
Circle original = new Circle(10, "red");
Circle copy = (Circle) original.clone();
copy.draw(); // Same as original`,
      },
    ],
  },
  {
    id: "flyweight",
    slug: "flyweight",
    name: "Flyweight",
    category: "structural",
    rank: 14,
    difficulty: 4,
    tagline: "Share objects to reduce memory usage",
    summary: "Flyweight uses sharing to support large numbers of fine-grained objects efficiently by separating intrinsic and extrinsic state.",
    metaphor: {
      title: "Font Characters",
      description: "Like how a word processor doesn't create a new 'A' object for every letter A - it reuses one glyph and just changes the position.",
      icon: "Minimize2",
    },
    intent: "Use sharing to support large numbers of fine-grained objects efficiently.",
    problem: "You need to create a huge number of similar objects, and the memory cost is too high.",
    solution: "Separate intrinsic (shared) state from extrinsic (unique) state, and share flyweight objects that contain only intrinsic state.",
    prerequisites: ["composite"],
    relatedPatterns: ["composite", "singleton"],
    usedWith: ["composite", "state", "strategy"],
    useWhen: [
      "You need a large number of similar objects",
      "Storage costs are high due to object quantity",
      "Most object state can be made extrinsic",
    ],
    dontUseWhen: [
      "You don't have many objects",
      "Objects have mostly unique state",
    ],
    commonMistakes: [
      "Storing extrinsic state in flyweights",
      "Over-engineering when not needed",
    ],
    realWorldExamples: [
      "String interning in Java",
      "Game character sprites",
      "Text editor character rendering",
    ],
    uml: {
      participants: [
        { id: "flyweight", name: "Flyweight", type: "interface", attributes: [], methods: ["+ operation(extrinsic)"], position: { x: 200, y: 30 } },
        { id: "concrete", name: "ConcreteFlyweight", type: "class", attributes: ["- intrinsicState"], methods: ["+ operation(extrinsic)"], position: { x: 100, y: 180 } },
        { id: "factory", name: "FlyweightFactory", type: "class", attributes: ["- flyweights"], methods: ["+ getFlyweight(key)"], position: { x: 350, y: 180 } },
      ],
      relationships: [
        { from: "concrete", to: "flyweight", type: "implementation" },
        { from: "factory", to: "flyweight", type: "dependency", label: "creates/returns" },
      ],
    },
    codeExamples: [
      {
        id: "flyweight-tree",
        title: "Tree Flyweight",
        description: "Rendering a forest with shared tree types",
        language: "java",
        code: `import java.util.HashMap;
import java.util.Map;

// Flyweight - shared tree type
class TreeType {
    private String name;
    private String color;
    private String texture;

    public TreeType(String name, String color, String texture) {
        this.name = name;
        this.color = color;
        this.texture = texture;
    }

    public void draw(int x, int y) {
        System.out.println("Drawing " + name + " at (" + x + "," + y + ")");
    }
}

// Flyweight Factory
class TreeFactory {
    private static Map<String, TreeType> types = new HashMap<>();

    public static TreeType getTreeType(String name, String color, String texture) {
        String key = name + color + texture;
        if (!types.containsKey(key)) {
            types.put(key, new TreeType(name, color, texture));
        }
        return types.get(key);
    }
}

// Context - stores extrinsic state
class Tree {
    private int x, y;
    private TreeType type; // Flyweight

    public Tree(int x, int y, TreeType type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public void draw() { type.draw(x, y); }
}

// Usage - millions of trees, few TreeTypes
TreeType oak = TreeFactory.getTreeType("Oak", "green", "rough");
Tree t1 = new Tree(10, 20, oak);
Tree t2 = new Tree(30, 40, oak); // Reuses same oak type`,
      },
    ],
  },
  {
    id: "template-method",
    slug: "template-method",
    name: "Template Method",
    category: "behavioral",
    rank: 15,
    difficulty: 2,
    tagline: "Define the skeleton of an algorithm",
    summary: "Template Method defines the skeleton of an algorithm in a method, letting subclasses override specific steps without changing the structure.",
    metaphor: {
      title: "Recipe Template",
      description: "Like a recipe that defines the steps (prep, cook, serve) but lets you customize each step - make pasta or steak using the same template.",
      icon: "FileText",
    },
    intent: "Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.",
    problem: "You have an algorithm with invariant parts and parts that should vary between implementations.",
    solution: "Put the invariant parts in a base class method and call abstract methods for the parts that vary.",
    prerequisites: ["strategy"],
    relatedPatterns: ["strategy", "factory-method"],
    usedWith: ["factory-method"],
    useWhen: [
      "You want to implement invariant parts of an algorithm once",
      "Common behavior should be localized in a base class",
      "You want to control subclass extensions",
    ],
    dontUseWhen: [
      "Every step varies between implementations",
      "You need runtime algorithm switching (use Strategy)",
    ],
    commonMistakes: [
      "Too many abstract methods making subclasses complex",
      "Not providing hook methods for optional steps",
    ],
    realWorldExamples: [
      "JUnit test frameworks (setUp, test, tearDown)",
      "Servlet doGet/doPost lifecycle",
      "React component lifecycle",
    ],
    uml: {
      participants: [
        { id: "abstract", name: "AbstractClass", type: "abstract", attributes: [], methods: ["+ templateMethod()", "# primitiveOp1()", "# primitiveOp2()"], position: { x: 150, y: 50 } },
        { id: "concrete", name: "ConcreteClass", type: "class", attributes: [], methods: ["# primitiveOp1()", "# primitiveOp2()"], position: { x: 150, y: 220 } },
      ],
      relationships: [
        { from: "concrete", to: "abstract", type: "inheritance" },
      ],
    },
    codeExamples: [
      {
        id: "template-game",
        title: "Game Template",
        description: "Different games using the same play structure",
        language: "java",
        code: `abstract class Game {
    // Template method - defines the skeleton
    public final void play() {
        initialize();
        startPlay();
        endPlay();
    }

    // Steps to be implemented by subclasses
    abstract void initialize();
    abstract void startPlay();
    abstract void endPlay();
}

class Chess extends Game {
    void initialize() { System.out.println("Chess: Setup board"); }
    void startPlay() { System.out.println("Chess: White moves first"); }
    void endPlay() { System.out.println("Chess: Checkmate!"); }
}

class Soccer extends Game {
    void initialize() { System.out.println("Soccer: Place ball"); }
    void startPlay() { System.out.println("Soccer: Kickoff!"); }
    void endPlay() { System.out.println("Soccer: Final whistle"); }
}

// Usage
Game chess = new Chess();
chess.play();`,
      },
    ],
  },
  {
    id: "command",
    slug: "command",
    name: "Command",
    category: "behavioral",
    rank: 16,
    difficulty: 3,
    tagline: "Encapsulate requests as objects",
    summary: "Command turns requests into stand-alone objects containing all request information, enabling parameterization, queuing, and undo operations.",
    metaphor: {
      title: "Remote Control",
      description: "Like a TV remote where each button is a command object - you can press, queue, or undo button presses without knowing how the TV works.",
      icon: "ToggleRight",
    },
    intent: "Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.",
    problem: "You need to issue requests without knowing the operation or the receiver, or you need undo/redo functionality.",
    solution: "Create command objects that encapsulate actions and receivers, with execute and optionally undo methods.",
    prerequisites: ["strategy"],
    relatedPatterns: ["memento", "composite"],
    usedWith: ["memento", "composite"],
    useWhen: [
      "You need to parameterize objects with operations",
      "You need to queue, schedule, or execute requests at different times",
      "You need undo functionality",
    ],
    dontUseWhen: [
      "Simple direct method calls are sufficient",
      "You don't need to queue or undo operations",
    ],
    commonMistakes: [
      "Commands that do too much",
      "Not implementing undo properly",
    ],
    realWorldExamples: [
      "GUI button actions",
      "Transaction systems",
      "Macro recording",
    ],
    uml: {
      participants: [
        { id: "command", name: "Command", type: "interface", attributes: [], methods: ["+ execute()", "+ undo()"], position: { x: 200, y: 30 } },
        { id: "concrete", name: "ConcreteCommand", type: "class", attributes: ["- receiver"], methods: ["+ execute()", "+ undo()"], position: { x: 200, y: 180 } },
        { id: "invoker", name: "Invoker", type: "class", attributes: ["- command"], methods: ["+ setCommand()", "+ invoke()"], position: { x: 50, y: 100 } },
        { id: "receiver", name: "Receiver", type: "class", attributes: [], methods: ["+ action()"], position: { x: 400, y: 180 } },
      ],
      relationships: [
        { from: "concrete", to: "command", type: "implementation" },
        { from: "invoker", to: "command", type: "association" },
        { from: "concrete", to: "receiver", type: "association" },
      ],
    },
    codeExamples: [
      {
        id: "command-light",
        title: "Light Switch Command",
        description: "Commands with undo support",
        language: "java",
        code: `// Command interface
interface Command {
    void execute();
    void undo();
}

// Receiver
class Light {
    public void on() { System.out.println("Light ON"); }
    public void off() { System.out.println("Light OFF"); }
}

// Concrete Commands
class LightOnCommand implements Command {
    private Light light;
    public LightOnCommand(Light light) { this.light = light; }
    public void execute() { light.on(); }
    public void undo() { light.off(); }
}

class LightOffCommand implements Command {
    private Light light;
    public LightOffCommand(Light light) { this.light = light; }
    public void execute() { light.off(); }
    public void undo() { light.on(); }
}

// Invoker
class RemoteControl {
    private Command command;
    private Command lastCommand;

    public void setCommand(Command cmd) { this.command = cmd; }
    public void pressButton() {
        command.execute();
        lastCommand = command;
    }
    public void pressUndo() { lastCommand.undo(); }
}

// Usage
Light light = new Light();
RemoteControl remote = new RemoteControl();
remote.setCommand(new LightOnCommand(light));
remote.pressButton(); // Light ON
remote.pressUndo();   // Light OFF`,
      },
    ],
  },
  {
    id: "state",
    slug: "state",
    name: "State",
    category: "behavioral",
    rank: 17,
    difficulty: 3,
    tagline: "Alter behavior when internal state changes",
    summary: "State lets an object change its behavior when its internal state changes, appearing to change its class.",
    metaphor: {
      title: "Traffic Light",
      description: "Like a traffic light that behaves differently in each state (red=stop, yellow=slow, green=go) - same light, different behavior.",
      icon: "CircleDot",
    },
    intent: "Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.",
    problem: "An object's behavior depends on its state, and it must change behavior at runtime depending on that state.",
    solution: "Create state classes for each state with the behavior for that state, and delegate state-specific behavior to the current state object.",
    prerequisites: ["strategy"],
    relatedPatterns: ["strategy", "flyweight"],
    usedWith: ["singleton", "flyweight"],
    useWhen: [
      "Object behavior depends on state and must change at runtime",
      "Operations have large conditional statements depending on state",
      "State transitions are explicit",
    ],
    dontUseWhen: [
      "There are only a few states",
      "State rarely changes",
    ],
    commonMistakes: [
      "Confusing State with Strategy",
      "State objects knowing too much about each other",
    ],
    realWorldExamples: [
      "TCP connection states",
      "Vending machine states",
      "Document workflow states",
    ],
    uml: {
      participants: [
        { id: "context", name: "Context", type: "class", attributes: ["- state"], methods: ["+ request()", "+ setState()"], position: { x: 50, y: 100 } },
        { id: "state", name: "State", type: "interface", attributes: [], methods: ["+ handle(context)"], position: { x: 280, y: 30 } },
        { id: "state-a", name: "ConcreteStateA", type: "class", attributes: [], methods: ["+ handle(context)"], position: { x: 200, y: 200 } },
        { id: "state-b", name: "ConcreteStateB", type: "class", attributes: [], methods: ["+ handle(context)"], position: { x: 380, y: 200 } },
      ],
      relationships: [
        { from: "context", to: "state", type: "aggregation" },
        { from: "state-a", to: "state", type: "implementation" },
        { from: "state-b", to: "state", type: "implementation" },
      ],
    },
    codeExamples: [
      {
        id: "state-vending",
        title: "Vending Machine",
        description: "State-dependent behavior for vending",
        language: "java",
        code: `// State interface
interface VendingState {
    void insertCoin(VendingMachine vm);
    void dispense(VendingMachine vm);
}

// Concrete States
class NoCoinState implements VendingState {
    public void insertCoin(VendingMachine vm) {
        System.out.println("Coin inserted");
        vm.setState(new HasCoinState());
    }
    public void dispense(VendingMachine vm) {
        System.out.println("Insert coin first!");
    }
}

class HasCoinState implements VendingState {
    public void insertCoin(VendingMachine vm) {
        System.out.println("Coin already inserted");
    }
    public void dispense(VendingMachine vm) {
        System.out.println("Dispensing product...");
        vm.setState(new NoCoinState());
    }
}

// Context
class VendingMachine {
    private VendingState state = new NoCoinState();

    public void setState(VendingState s) { this.state = s; }
    public void insertCoin() { state.insertCoin(this); }
    public void dispense() { state.dispense(this); }
}

// Usage
VendingMachine vm = new VendingMachine();
vm.dispense();    // "Insert coin first!"
vm.insertCoin();  // "Coin inserted"
vm.dispense();    // "Dispensing product..."`,
      },
    ],
  },
  {
    id: "chain-of-responsibility",
    slug: "chain-of-responsibility",
    name: "Chain of Responsibility",
    category: "behavioral",
    rank: 18,
    difficulty: 3,
    tagline: "Pass requests along a chain of handlers",
    summary: "Chain of Responsibility passes requests along a chain of handlers, where each handler decides to process the request or pass it on.",
    metaphor: {
      title: "Support Escalation",
      description: "Like customer support tiers - your issue goes to Level 1, if they can't help, it escalates to Level 2, then Level 3, until someone handles it.",
      icon: "GitPullRequest",
    },
    intent: "Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.",
    problem: "You need to process a request with multiple potential handlers, and the handler isn't known in advance.",
    solution: "Create a chain of handler objects, each with a reference to the next. Each handler decides to process or pass to the next.",
    prerequisites: ["composite"],
    relatedPatterns: ["composite", "decorator"],
    usedWith: ["composite"],
    useWhen: [
      "More than one object may handle a request",
      "The handler isn't known a priori",
      "You want to issue a request without specifying the receiver",
    ],
    dontUseWhen: [
      "There's always exactly one handler",
      "All requests must be handled",
    ],
    commonMistakes: [
      "Requests falling off the chain unhandled",
      "Chains that are too long",
    ],
    realWorldExamples: [
      "Servlet filters",
      "Exception handling",
      "Event bubbling in DOM",
    ],
    uml: {
      participants: [
        { id: "handler", name: "Handler", type: "abstract", attributes: ["- successor"], methods: ["+ handleRequest()", "+ setSuccessor()"], position: { x: 200, y: 30 } },
        { id: "handler-a", name: "ConcreteHandlerA", type: "class", attributes: [], methods: ["+ handleRequest()"], position: { x: 100, y: 200 } },
        { id: "handler-b", name: "ConcreteHandlerB", type: "class", attributes: [], methods: ["+ handleRequest()"], position: { x: 300, y: 200 } },
      ],
      relationships: [
        { from: "handler-a", to: "handler", type: "inheritance" },
        { from: "handler-b", to: "handler", type: "inheritance" },
        { from: "handler", to: "handler", type: "association", label: "successor" },
      ],
    },
    codeExamples: [
      {
        id: "chain-support",
        title: "Support Chain",
        description: "Escalating support requests",
        language: "java",
        code: `abstract class SupportHandler {
    protected SupportHandler next;

    public void setNext(SupportHandler handler) {
        this.next = handler;
    }

    public abstract void handle(String issue, int level);
}

class Level1Support extends SupportHandler {
    public void handle(String issue, int level) {
        if (level <= 1) {
            System.out.println("L1 handling: " + issue);
        } else if (next != null) {
            next.handle(issue, level);
        }
    }
}

class Level2Support extends SupportHandler {
    public void handle(String issue, int level) {
        if (level <= 2) {
            System.out.println("L2 handling: " + issue);
        } else if (next != null) {
            next.handle(issue, level);
        }
    }
}

class Level3Support extends SupportHandler {
    public void handle(String issue, int level) {
        System.out.println("L3 (expert) handling: " + issue);
    }
}

// Usage - build the chain
SupportHandler l1 = new Level1Support();
SupportHandler l2 = new Level2Support();
SupportHandler l3 = new Level3Support();
l1.setNext(l2);
l2.setNext(l3);

l1.handle("Password reset", 1);  // L1 handles
l1.handle("Server crash", 3);    // Escalates to L3`,
      },
    ],
  },
  {
    id: "iterator",
    slug: "iterator",
    name: "Iterator",
    category: "behavioral",
    rank: 19,
    difficulty: 2,
    tagline: "Access elements sequentially without exposing internals",
    summary: "Iterator provides a way to access elements of a collection sequentially without exposing its underlying representation.",
    metaphor: {
      title: "Playlist Navigation",
      description: "Like navigating a music playlist - you can go next, previous, or check if there are more songs, without knowing how the playlist stores songs.",
      icon: "ListMusic",
    },
    intent: "Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.",
    problem: "You need to traverse a collection without exposing its internal structure, or you need multiple traversal methods.",
    solution: "Create an iterator interface that defines traversal methods, and have collections provide iterators.",
    prerequisites: [],
    relatedPatterns: ["composite", "factory-method"],
    usedWith: ["composite", "memento"],
    useWhen: [
      "You want to access a collection's contents without exposing internals",
      "You need multiple traversal methods for a collection",
      "You want a uniform interface for traversing different structures",
    ],
    dontUseWhen: [
      "Direct access to elements is acceptable",
      "The collection is very simple",
    ],
    commonMistakes: [
      "Modifying collection while iterating",
      "Not handling concurrent modification",
    ],
    realWorldExamples: [
      "Java Iterator interface",
      "Database cursors",
      "File system traversal",
    ],
    uml: {
      participants: [
        { id: "iterator", name: "Iterator", type: "interface", attributes: [], methods: ["+ hasNext()", "+ next()"], position: { x: 50, y: 50 } },
        { id: "concrete-it", name: "ConcreteIterator", type: "class", attributes: ["- index"], methods: ["+ hasNext()", "+ next()"], position: { x: 50, y: 200 } },
        { id: "aggregate", name: "Aggregate", type: "interface", attributes: [], methods: ["+ createIterator()"], position: { x: 300, y: 50 } },
        { id: "concrete-agg", name: "ConcreteAggregate", type: "class", attributes: ["- items[]"], methods: ["+ createIterator()"], position: { x: 300, y: 200 } },
      ],
      relationships: [
        { from: "concrete-it", to: "iterator", type: "implementation" },
        { from: "concrete-agg", to: "aggregate", type: "implementation" },
        { from: "concrete-agg", to: "concrete-it", type: "dependency", label: "creates" },
      ],
    },
    codeExamples: [
      {
        id: "iterator-collection",
        title: "Custom Collection Iterator",
        description: "Iterating over a custom collection",
        language: "java",
        code: `// Iterator interface
interface Iterator<T> {
    boolean hasNext();
    T next();
}

// Collection with iterator
class BookCollection {
    private String[] books;
    private int size = 0;

    public BookCollection(int capacity) {
        books = new String[capacity];
    }

    public void addBook(String book) {
        books[size++] = book;
    }

    public Iterator<String> iterator() {
        return new BookIterator();
    }

    // Inner class iterator
    private class BookIterator implements Iterator<String> {
        private int index = 0;

        public boolean hasNext() {
            return index < size;
        }

        public String next() {
            return books[index++];
        }
    }
}

// Usage
BookCollection library = new BookCollection(10);
library.addBook("Design Patterns");
library.addBook("Clean Code");

Iterator<String> it = library.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}`,
      },
    ],
  },
  {
    id: "mediator",
    slug: "mediator",
    name: "Mediator",
    category: "behavioral",
    rank: 20,
    difficulty: 4,
    tagline: "Centralize complex communications between objects",
    summary: "Mediator defines an object that encapsulates how a set of objects interact, promoting loose coupling by keeping objects from referring to each other explicitly.",
    metaphor: {
      title: "Air Traffic Control",
      description: "Like an airport control tower - planes don't communicate directly with each other. Instead, all communication goes through the tower, which coordinates everyone safely.",
      icon: "Network",
    },
    intent: "Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly.",
    problem: "Many objects communicate with each other in complex ways, creating tight coupling and making the system hard to maintain.",
    solution: "Create a mediator object that handles all communication between objects. Objects only know about the mediator, not each other.",
    prerequisites: ["observer"],
    relatedPatterns: ["facade", "observer"],
    usedWith: ["observer"],
    useWhen: [
      "Objects communicate in complex but well-defined ways",
      "Reusing an object is difficult due to its dependencies",
      "You want to customize behavior distributed across classes",
    ],
    dontUseWhen: [
      "Communication between objects is simple",
      "The mediator would become a god object",
    ],
    commonMistakes: [
      "Mediator becoming too complex (god object)",
      "Using mediator when direct communication is simpler",
    ],
    realWorldExamples: [
      "Chat room servers",
      "Flight control systems",
      "Event aggregators in UI",
    ],
    uml: {
      participants: [
        { id: "mediator", name: "Mediator", type: "interface", attributes: [], methods: ["+ notify(sender, event)"], position: { x: 200, y: 30 } },
        { id: "concrete-med", name: "ConcreteMediator", type: "class", attributes: ["- colleagues"], methods: ["+ notify()", "+ react()"], position: { x: 200, y: 150 } },
        { id: "colleague-a", name: "ColleagueA", type: "class", attributes: ["- mediator"], methods: ["+ operation()"], position: { x: 50, y: 280 } },
        { id: "colleague-b", name: "ColleagueB", type: "class", attributes: ["- mediator"], methods: ["+ operation()"], position: { x: 350, y: 280 } },
      ],
      relationships: [
        { from: "concrete-med", to: "mediator", type: "implementation" },
        { from: "colleague-a", to: "mediator", type: "association" },
        { from: "colleague-b", to: "mediator", type: "association" },
        { from: "concrete-med", to: "colleague-a", type: "association" },
        { from: "concrete-med", to: "colleague-b", type: "association" },
      ],
    },
    codeExamples: [
      {
        id: "mediator-chatroom",
        title: "Chat Room Mediator",
        description: "Coordinating messages between users",
        language: "java",
        code: `// Mediator interface
interface ChatMediator {
    void sendMessage(String msg, User user);
    void addUser(User user);
}

// Concrete mediator
class ChatRoom implements ChatMediator {
    private List<User> users = new ArrayList<>();

    public void addUser(User user) {
        users.add(user);
    }

    public void sendMessage(String msg, User sender) {
        for (User user : users) {
            // Don't send to the sender
            if (user != sender) {
                user.receive(msg);
            }
        }
    }
}

// Colleague
abstract class User {
    protected ChatMediator mediator;
    protected String name;

    public User(ChatMediator med, String name) {
        this.mediator = med;
        this.name = name;
    }

    public abstract void send(String msg);
    public abstract void receive(String msg);
}

class ChatUser extends User {
    public ChatUser(ChatMediator med, String name) {
        super(med, name);
    }

    public void send(String msg) {
        System.out.println(name + " sends: " + msg);
        mediator.sendMessage(msg, this);
    }

    public void receive(String msg) {
        System.out.println(name + " receives: " + msg);
    }
}

// Usage
ChatMediator chatRoom = new ChatRoom();
User alice = new ChatUser(chatRoom, "Alice");
User bob = new ChatUser(chatRoom, "Bob");
chatRoom.addUser(alice);
chatRoom.addUser(bob);

alice.send("Hello everyone!");
// Alice sends: Hello everyone!
// Bob receives: Hello everyone!`,
      },
    ],
  },
  {
    id: "memento",
    slug: "memento",
    name: "Memento",
    category: "behavioral",
    rank: 21,
    difficulty: 3,
    tagline: "Capture and restore object state without violating encapsulation",
    summary: "Memento captures and externalizes an object's internal state so the object can be restored to this state later, without violating encapsulation.",
    metaphor: {
      title: "Game Save Points",
      description: "Like saving your game progress - you can create a snapshot of your current state and return to it later if things go wrong, without exposing all the game's internal data.",
      icon: "Save",
    },
    intent: "Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.",
    problem: "You need to save and restore an object's state (for undo, checkpoints, etc.) but the state is private.",
    solution: "Create memento objects that store snapshots of state. The originator creates and restores from mementos, while caretakers hold mementos without examining them.",
    prerequisites: ["command"],
    relatedPatterns: ["command", "iterator"],
    usedWith: ["command"],
    useWhen: [
      "You need to save snapshots of an object's state",
      "Direct access to state would expose implementation",
      "You're implementing undo/redo functionality",
    ],
    dontUseWhen: [
      "State is already public",
      "Creating mementos would be too expensive",
    ],
    commonMistakes: [
      "Exposing memento internals",
      "Storing too many mementos (memory issues)",
      "Not handling serialization for persistence",
    ],
    realWorldExamples: [
      "Undo in text editors",
      "Transaction rollback",
      "Browser history",
    ],
    uml: {
      participants: [
        { id: "originator", name: "Originator", type: "class", attributes: ["- state"], methods: ["+ save(): Memento", "+ restore(m)"], position: { x: 50, y: 100 } },
        { id: "memento", name: "Memento", type: "class", attributes: ["- state"], methods: ["+ getState()"], position: { x: 250, y: 100 } },
        { id: "caretaker", name: "Caretaker", type: "class", attributes: ["- mementos[]"], methods: ["+ addMemento()", "+ getMemento()"], position: { x: 450, y: 100 } },
      ],
      relationships: [
        { from: "originator", to: "memento", type: "dependency", label: "creates" },
        { from: "caretaker", to: "memento", type: "aggregation" },
      ],
    },
    codeExamples: [
      {
        id: "memento-editor",
        title: "Text Editor with Undo",
        description: "Saving and restoring editor state",
        language: "java",
        code: `// Memento - stores state
class EditorMemento {
    private final String content;
    private final int cursorPosition;

    public EditorMemento(String content, int cursor) {
        this.content = content;
        this.cursorPosition = cursor;
    }

    public String getContent() { return content; }
    public int getCursorPosition() { return cursorPosition; }
}

// Originator - creates and restores from mementos
class TextEditor {
    private String content = "";
    private int cursorPosition = 0;

    public void type(String text) {
        content += text;
        cursorPosition = content.length();
    }

    public EditorMemento save() {
        return new EditorMemento(content, cursorPosition);
    }

    public void restore(EditorMemento memento) {
        content = memento.getContent();
        cursorPosition = memento.getCursorPosition();
    }

    public String getContent() { return content; }
}

// Caretaker - holds mementos
class History {
    private Stack<EditorMemento> states = new Stack<>();

    public void push(EditorMemento memento) {
        states.push(memento);
    }

    public EditorMemento pop() {
        return states.pop();
    }
}

// Usage
TextEditor editor = new TextEditor();
History history = new History();

editor.type("Hello");
history.push(editor.save());  // Save state

editor.type(" World");
history.push(editor.save());  // Save state

editor.type("!!!");
System.out.println(editor.getContent()); // "Hello World!!!"

editor.restore(history.pop());  // Undo
System.out.println(editor.getContent()); // "Hello World"`,
      },
    ],
  },
  {
    id: "visitor",
    slug: "visitor",
    name: "Visitor",
    category: "behavioral",
    rank: 22,
    difficulty: 5,
    tagline: "Add operations to objects without modifying them",
    summary: "Visitor lets you define new operations without changing the classes of the elements on which it operates, using double dispatch.",
    metaphor: {
      title: "Museum Tour Guide",
      description: "Like a tour guide visiting different exhibits - the guide (visitor) has different explanations for paintings, sculptures, and artifacts, but the exhibits themselves don't change.",
      icon: "ScanEye",
    },
    intent: "Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.",
    problem: "You need to perform many distinct operations across a set of objects with different interfaces, but you don't want to pollute their classes.",
    solution: "Create visitor classes that implement operations for each element type. Elements accept visitors and call the appropriate visit method (double dispatch).",
    prerequisites: ["composite", "iterator"],
    relatedPatterns: ["composite", "interpreter"],
    usedWith: ["composite", "iterator"],
    useWhen: [
      "Object structure has many classes with differing interfaces",
      "You need many distinct unrelated operations",
      "Classes defining the structure rarely change",
    ],
    dontUseWhen: [
      "Element classes change frequently",
      "There are few element types",
      "Operations are simple and few",
    ],
    commonMistakes: [
      "Using visitor when element types change often",
      "Breaking encapsulation to access element data",
      "Not using double dispatch correctly",
    ],
    realWorldExamples: [
      "AST traversal in compilers",
      "Document export (PDF, HTML, etc.)",
      "Tax calculators for different item types",
    ],
    uml: {
      participants: [
        { id: "visitor", name: "Visitor", type: "interface", attributes: [], methods: ["+ visitA(ElementA)", "+ visitB(ElementB)"], position: { x: 50, y: 50 } },
        { id: "concrete-vis", name: "ConcreteVisitor", type: "class", attributes: [], methods: ["+ visitA()", "+ visitB()"], position: { x: 50, y: 200 } },
        { id: "element", name: "Element", type: "interface", attributes: [], methods: ["+ accept(Visitor)"], position: { x: 350, y: 50 } },
        { id: "element-a", name: "ElementA", type: "class", attributes: [], methods: ["+ accept(v)", "+ opA()"], position: { x: 280, y: 200 } },
        { id: "element-b", name: "ElementB", type: "class", attributes: [], methods: ["+ accept(v)", "+ opB()"], position: { x: 420, y: 200 } },
      ],
      relationships: [
        { from: "concrete-vis", to: "visitor", type: "implementation" },
        { from: "element-a", to: "element", type: "implementation" },
        { from: "element-b", to: "element", type: "implementation" },
        { from: "element", to: "visitor", type: "dependency", label: "accept" },
      ],
    },
    codeExamples: [
      {
        id: "visitor-shapes",
        title: "Shape Area/Perimeter Calculator",
        description: "Adding operations to shapes without modifying them",
        language: "java",
        code: `// Visitor interface
interface ShapeVisitor {
    void visit(Circle circle);
    void visit(Rectangle rect);
}

// Element interface
interface Shape {
    void accept(ShapeVisitor visitor);
}

// Concrete elements
class Circle implements Shape {
    double radius;
    public Circle(double r) { radius = r; }
    public void accept(ShapeVisitor v) { v.visit(this); }
}

class Rectangle implements Shape {
    double width, height;
    public Rectangle(double w, double h) { width = w; height = h; }
    public void accept(ShapeVisitor v) { v.visit(this); }
}

// Concrete visitors - new operations without changing shapes
class AreaCalculator implements ShapeVisitor {
    public void visit(Circle c) {
        double area = Math.PI * c.radius * c.radius;
        System.out.println("Circle area: " + area);
    }
    public void visit(Rectangle r) {
        System.out.println("Rect area: " + r.width * r.height);
    }
}

class PerimeterCalculator implements ShapeVisitor {
    public void visit(Circle c) {
        System.out.println("Circle perimeter: " + 2 * Math.PI * c.radius);
    }
    public void visit(Rectangle r) {
        System.out.println("Rect perimeter: " + 2 * (r.width + r.height));
    }
}

// Usage
List<Shape> shapes = Arrays.asList(new Circle(5), new Rectangle(4, 6));
ShapeVisitor areaCalc = new AreaCalculator();
ShapeVisitor perimCalc = new PerimeterCalculator();

for (Shape s : shapes) {
    s.accept(areaCalc);    // Calculate areas
    s.accept(perimCalc);   // Calculate perimeters
}`,
      },
    ],
  },
  {
    id: "interpreter",
    slug: "interpreter",
    name: "Interpreter",
    category: "behavioral",
    rank: 23,
    difficulty: 5,
    tagline: "Define a grammar and interpreter for a language",
    summary: "Interpreter defines a representation for a language's grammar along with an interpreter that uses the representation to interpret sentences in the language.",
    metaphor: {
      title: "Language Translator",
      description: "Like a human translator interpreting sentences - they understand the grammar rules and can break down any sentence into parts, understanding and converting each piece according to the rules.",
      icon: "Terminal",
    },
    intent: "Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.",
    problem: "You have a language (like math expressions or SQL) and need to interpret sentences in that language.",
    solution: "Create classes for each grammar rule. Each class implements an interpret method that evaluates its part of the expression.",
    prerequisites: ["composite", "visitor"],
    relatedPatterns: ["composite", "flyweight", "visitor"],
    usedWith: ["composite", "iterator", "visitor"],
    useWhen: [
      "Grammar is simple and efficiency isn't critical",
      "You need to interpret a simple language or DSL",
      "Statements can be represented as abstract syntax trees",
    ],
    dontUseWhen: [
      "Grammar is complex (use parser generators)",
      "Efficiency is critical",
      "Grammar changes frequently",
    ],
    commonMistakes: [
      "Using for complex grammars (use yacc/ANTLR instead)",
      "Not using Flyweight for terminal symbols",
      "Making grammar too complex",
    ],
    realWorldExamples: [
      "Regular expression engines",
      "SQL query parsers",
      "Calculator applications",
    ],
    uml: {
      participants: [
        { id: "expression", name: "AbstractExpression", type: "abstract", attributes: [], methods: ["+ interpret(context)"], position: { x: 200, y: 30 } },
        { id: "terminal", name: "TerminalExpression", type: "class", attributes: [], methods: ["+ interpret()"], position: { x: 80, y: 180 } },
        { id: "nonterminal", name: "NonterminalExpression", type: "class", attributes: ["- expressions[]"], methods: ["+ interpret()"], position: { x: 320, y: 180 } },
        { id: "context", name: "Context", type: "class", attributes: ["- variables"], methods: ["+ lookup()", "+ assign()"], position: { x: 450, y: 30 } },
      ],
      relationships: [
        { from: "terminal", to: "expression", type: "inheritance" },
        { from: "nonterminal", to: "expression", type: "inheritance" },
        { from: "nonterminal", to: "expression", type: "aggregation" },
      ],
    },
    codeExamples: [
      {
        id: "interpreter-math",
        title: "Math Expression Interpreter",
        description: "Parsing and evaluating arithmetic expressions",
        language: "java",
        code: `// Abstract Expression
interface Expression {
    int interpret();
}

// Terminal Expression - numbers
class NumberExpression implements Expression {
    private int number;
    public NumberExpression(int n) { number = n; }
    public int interpret() { return number; }
}

// Non-terminal Expressions - operations
class AddExpression implements Expression {
    private Expression left, right;
    public AddExpression(Expression l, Expression r) {
        left = l; right = r;
    }
    public int interpret() {
        return left.interpret() + right.interpret();
    }
}

class MultiplyExpression implements Expression {
    private Expression left, right;
    public MultiplyExpression(Expression l, Expression r) {
        left = l; right = r;
    }
    public int interpret() {
        return left.interpret() * right.interpret();
    }
}

class SubtractExpression implements Expression {
    private Expression left, right;
    public SubtractExpression(Expression l, Expression r) {
        left = l; right = r;
    }
    public int interpret() {
        return left.interpret() - right.interpret();
    }
}

// Usage: Interpret "((5 + 3) * 2) - 4"
Expression expr = new SubtractExpression(
    new MultiplyExpression(
        new AddExpression(
            new NumberExpression(5),
            new NumberExpression(3)
        ),
        new NumberExpression(2)
    ),
    new NumberExpression(4)
);

System.out.println("Result: " + expr.interpret()); // 12`,
      },
    ],
  },
];

export function getPatternBySlug(slug: string): PatternMetadata | undefined {
  return patterns.find((p) => p.slug === slug);
}

using NUnit.Framework;
using PaylocityInterview.DBModels;
using PaylocityInterview.Services;
using System.Collections.Generic;

namespace TestPaylocityInterview
{
    [TestFixture]
    public class EmployeeBenefitServiceTests
    {
        private EmployeeBenefitService _employeeBenefitService;

        [SetUp]
        public void Setup()
        {
            _employeeBenefitService = new EmployeeBenefitService();
        }

        [Test]
        public void DiscountReceived_WhenNameDoesNotStartWithA_ReturnsFullCost()
        {
            // Arrange
            var name = "Bob Test";

            // Act
            var result = EmployeeBenefitService.DiscountReceived(name);

            // Assert
            Assert.That(result, Is.EqualTo(1));
        }

        [Test]
        public void DiscountReceived_WhenNameDoesStartWithA_ReturnsDiscount()
        {
            // Arrange
            var name = "Abby Test";

            // Act
            var result = EmployeeBenefitService.DiscountReceived(name);

            // Assert
            Assert.That(result, Is.EqualTo(0.9));
        }

        [Test]
        public void CalculateEmployeeBenefitDetail_WhenNoDiscountAndNoDependents_ReturnsFullAmount()
        {
            // Arrange
            var employee = new Employee
            {
                FullName = "Test Employee"
            };

            // Act
            var benefitCost = _employeeBenefitService.CalculateEmployeeBenefitDetail(employee);

            //Assert
            Assert.That(benefitCost.TotalBenefitCost, Is.EqualTo(1000));
        }

        [Test]
        public void CalculateEmployeeBenefitDetail_WhenNoDiscountAndOneDependent_ReturnsFullAmount()
        {
            // Arrange
            var employee = new Employee
            {
                FullName = "Test Employee",
                Dependents = new List<Dependent>()
                {
                    new Dependent(){FullName = "Test Dependent"}
                }
            };

            // Act
            var benefitCost = _employeeBenefitService.CalculateEmployeeBenefitDetail(employee);

            //Assert
            Assert.That(benefitCost.TotalBenefitCost, Is.EqualTo(1500));
        }

        [Test]
        public void CalculateEmployeeBenefitDetail_WhenNoDiscountAndMultipleDependents_ReturnsFullAmount()
        {
            // Arrange
            var employee = new Employee
            {
                FullName = "Test Employee",
                Dependents = new List<Dependent>()
                {
                    new Dependent {FullName = "Test Dependent"},
                    new Dependent {FullName = "Test Dependent 2"}
                }
            };

            // Act
            var benefitCost = _employeeBenefitService.CalculateEmployeeBenefitDetail(employee);

            //Assert
            Assert.That(benefitCost.TotalBenefitCost, Is.EqualTo(2000));
        }

        [Test]
        public void CalculateEmployeeBenefitDetail_WhenEmployeeDiscountAndNoDependents_ReturnsDiscountAmount()
        {
            // Arrange
            var employee = new Employee
            {
                FullName = "A Test Employee"
            };

            // Act
            var benefitCost = _employeeBenefitService.CalculateEmployeeBenefitDetail(employee);

            //Assert
            Assert.That(benefitCost.TotalBenefitCost, Is.EqualTo(900));
        }

        [Test]
        public void CalculateEmployeeBenefitDetail_WhenDependentDiscountAndMultipleDependents_ReturnsDiscountAmount()
        {
            // Arrange
            var employee = new Employee
            {
                FullName = "Test Employee",
                Dependents = new List<Dependent>()
                {
                    new Dependent {FullName = "A Test Dependent"},
                    new Dependent {FullName = "Test Dependent 2"}
                }
            };

            // Act
            var benefitCost = _employeeBenefitService.CalculateEmployeeBenefitDetail(employee);

            //Assert
            Assert.That(benefitCost.TotalBenefitCost, Is.EqualTo(1950));
        }
    }
}